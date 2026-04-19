/**
 * FairGig Grievance Service - Express.js backend
 * Handles grievance posting, moderation, community engagement, and advocacy workflows
 */

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || 'postgresql://user:password@localhost/fairgig'
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000'],
  credentials: true
}));
app.use(express.json());

// Database query helper
const query = (text, params) => pool.query(text, params);

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'grievance-service' });
});

// ==================== GRIEVANCE ENDPOINTS ====================

/**
 * POST /grievances - Create a new grievance
 */
app.post('/grievances', async (req, res) => {
  const { worker_id, platform, title, description, category, severity } = req.body;
  
  try {
    const result = await query(`
      INSERT INTO grievances
      (worker_id, platform, title, description, category, severity, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'open')
      RETURNING id, worker_id, title, description, status, created_at
    `, [worker_id, platform, title, description, category || 'general', severity || 'medium']);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating grievance:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /grievances - List grievances with filtering
 */
app.get('/grievances', async (req, res) => {
  const { status, platform, limit = 20, offset = 0, sort = 'created_at' } = req.query;
  
  try {
    let whereClause = 'WHERE 1=1';
    const params = [];
    let paramCount = 1;
    
    if (status) {
      whereClause += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }
    
    if (platform) {
      whereClause += ` AND platform = $${paramCount}`;
      params.push(platform);
      paramCount++;
    }
    
    const validSortFields = ['created_at', 'likes_count', 'severity'];
    const sortField = validSortFields.includes(sort) ? sort : 'created_at';
    
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await query(`
      SELECT g.id, g.worker_id, g.platform, g.title, g.description, g.category,
             g.severity, g.status, g.likes_count, g.comments_count, g.created_at,
             u.full_name, u.city
      FROM grievances g
      JOIN users u ON g.worker_id = u.id
      ${whereClause}
      ORDER BY ${sortField} DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, params);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching grievances:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /grievances/:id - Get single grievance with comments
 */
app.get('/grievances/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const grievanceResult = await query(`
      SELECT g.*, u.full_name, u.email, u.city
      FROM grievances g
      JOIN users u ON g.worker_id = u.id
      WHERE g.id = $1
    `, [id]);
    
    if (grievanceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Grievance not found' });
    }
    
    const commentsResult = await query(`
      SELECT gc.id, gc.user_id, gc.content, gc.likes_count, gc.created_at,
             u.full_name, u.role
      FROM grievance_comments gc
      JOIN users u ON gc.user_id = u.id
      WHERE gc.grievance_id = $1
      ORDER BY gc.created_at DESC
    `, [id]);
    
    const grievance = grievanceResult.rows[0];
    grievance.comments = commentsResult.rows;
    
    res.json(grievance);
  } catch (error) {
    console.error('Error fetching grievance:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /grievances/:id/comments - Add comment to grievance
 */
app.post('/grievances/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { user_id, content } = req.body;
  
  try {
    const result = await query(`
      INSERT INTO grievance_comments
      (grievance_id, user_id, content, is_moderated)
      VALUES ($1, $2, $3, false)
      RETURNING id, user_id, content, created_at
    `, [id, user_id, content]);
    
    // Increment comment count
    await query(`
      UPDATE grievances SET comments_count = comments_count + 1
      WHERE id = $1
    `, [id]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /grievances/:id/like - Like a grievance
 */
app.post('/grievances/:id/like', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await query(`
      UPDATE grievances SET likes_count = likes_count + 1
      WHERE id = $1
      RETURNING id, likes_count
    `, [id]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error liking grievance:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /grievances/:id/assign - Assign grievance to advocate
 */
app.post('/grievances/:id/assign', async (req, res) => {
  const { id } = req.params;
  const { advocate_id, status } = req.body;
  
  try {
    const result = await query(`
      UPDATE grievances
      SET assigned_advocate_id = $1, status = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, assigned_advocate_id, status
    `, [advocate_id, status || 'in_review', id]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error assigning grievance:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /grievances/:id/resolve - Mark grievance as resolved
 */
app.post('/grievances/:id/resolve', async (req, res) => {
  const { id } = req.params;
  const { resolution_notes } = req.body;
  
  try {
    const result = await query(`
      UPDATE grievances
      SET status = 'resolved', resolution_notes = $1, 
          resolved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, status, resolved_at
    `, [resolution_notes, id]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error resolving grievance:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== MODERATION ENDPOINTS ====================

/**
 * GET /moderation/flagged - Get flagged comments for review
 */
app.get('/moderation/flagged', async (req, res) => {
  try {
    const result = await query(`
      SELECT gc.*, g.title, u.full_name
      FROM grievance_comments gc
      JOIN grievances g ON gc.grievance_id = g.id
      JOIN users u ON gc.user_id = u.id
      WHERE gc.is_flagged = true OR gc.is_moderated = false
      ORDER BY gc.created_at DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching flagged comments:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /moderation/comments/:id/approve - Approve comment
 */
app.post('/moderation/comments/:id/approve', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await query(`
      UPDATE grievance_comments
      SET is_moderated = true, is_flagged = false
      WHERE id = $1
      RETURNING id, is_moderated
    `, [id]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error approving comment:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /moderation/comments/:id/reject - Remove comment
 */
app.post('/moderation/comments/:id/reject', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Get grievance_id first
    const commentResult = await query(
      'SELECT grievance_id FROM grievance_comments WHERE id = $1',
      [id]
    );
    
    if (commentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    const grievanceId = commentResult.rows[0].grievance_id;
    
    // Delete comment
    await query('DELETE FROM grievance_comments WHERE id = $1', [id]);
    
    // Decrement comment count
    await query(
      'UPDATE grievances SET comments_count = GREATEST(0, comments_count - 1) WHERE id = $1',
      [grievanceId]
    );
    
    res.json({ status: 'deleted', comment_id: id });
  } catch (error) {
    console.error('Error rejecting comment:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== STATISTICS ENDPOINTS ====================

/**
 * GET /stats - Platform and grievance statistics
 */
app.get('/stats', async (req, res) => {
  try {
    const platformStats = await query(`
      SELECT platform, COUNT(*) as total_grievances,
             SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved,
             AVG(EXTRACT(DAY FROM (resolved_at - created_at))) as avg_resolution_days
      FROM grievances
      WHERE platform IS NOT NULL
      GROUP BY platform
      ORDER BY total_grievances DESC
    `);
    
    const severityStats = await query(`
      SELECT severity, COUNT(*) as count, 
             SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved
      FROM grievances
      GROUP BY severity
    `);
    
    const recentCases = await query(`
      SELECT id, title, platform, status, created_at
      FROM grievances
      ORDER BY created_at DESC
      LIMIT 10
    `);
    
    res.json({
      platform_stats: platformStats.rows,
      severity_stats: severityStats.rows,
      recent_cases: recentCases.rows
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// ==================== SERVER START ====================

const PORT = process.env.PORT || 8004;
app.listen(PORT, () => {
  console.log(`Grievance Service running on port ${PORT}`);
});
