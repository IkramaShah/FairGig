# FairGig API Documentation

Complete REST API specification for the FairGig multi-service platform. All services run locally on different ports and communicate via HTTP.

## Service Endpoints

| Service | Port | Base URL |
|---------|------|----------|
| Auth Service | 8001 | `http://localhost:8001` |
| Earnings Service | 8002 | `http://localhost:8002` |
| Anomaly Detection | 8003 | `http://localhost:8003` |
| Grievance Service | 8004 | `http://localhost:8004` |

---

## 1. AUTH SERVICE (Port 8001)

Handles user authentication, JWT token generation, and role management.

### POST /auth/register
Register a new user account

**Request:**
```json
{
  "email": "alex.thompson@example.com",
  "password": "secure_password",
  "full_name": "Alex Thompson",
  "role": "worker",
  "city": "San Francisco",
  "state": "CA"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "role": "worker",
  "email": "alex.thompson@example.com"
}
```

### POST /auth/login
Authenticate and receive JWT token

**Request:**
```json
{
  "email": "alex.thompson@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "role": "worker",
  "email": "alex.thompson@example.com"
}
```

### GET /auth/verify
Verify JWT token validity

**Query Parameters:**
- `token` (required) - JWT token to verify

**Response:**
```json
{
  "valid": true,
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "email": "alex.thompson@example.com",
  "role": "worker",
  "expires_at": 1705000000
}
```

### GET /auth/user/{user_id}
Get user profile information

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "email": "alex.thompson@example.com",
  "full_name": "Alex Thompson",
  "role": "worker",
  "city": "San Francisco",
  "state": "CA",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

## 2. EARNINGS SERVICE (Port 8002)

Manages shift logging, CSV imports, screenshot verification, and earnings aggregation.

### POST /shifts
Create a new shift entry

**Query Parameters:**
- `worker_id` (required) - UUID of the worker

**Request:**
```json
{
  "platform": "Uber Eats",
  "shift_date": "2024-01-24",
  "start_time": "19:00:00",
  "end_time": "23:45:00",
  "duration_hours": 4.75,
  "gross_earnings": 178.50,
  "platform_fees": 17.85,
  "net_earnings": 160.65,
  "city": "San Francisco",
  "notes": "Rainy evening, good tips"
}
```

**Response:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "worker_id": "550e8400-e29b-41d4-a716-446655440001",
  "platform": "Uber Eats",
  "shift_date": "2024-01-24",
  "duration_hours": 4.75,
  "gross_earnings": 178.50,
  "net_earnings": 160.65,
  "status": "logged",
  "created_at": "2024-01-24T23:45:00Z"
}
```

### GET /shifts/{worker_id}
Get all shifts for a worker

**Response:**
```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "worker_id": "550e8400-e29b-41d4-a716-446655440001",
    "platform": "Uber Eats",
    "shift_date": "2024-01-24",
    "duration_hours": 4.75,
    "gross_earnings": 178.50,
    "net_earnings": 160.65,
    "status": "logged",
    "created_at": "2024-01-24T23:45:00Z"
  }
]
```

### POST /shifts/{shift_id}/screenshot
Upload screenshot for verification

**Query Parameters:**
- `worker_id` (required) - UUID of the worker

**Request:**
```
multipart/form-data:
- file: (binary screenshot file)
```

**Response:**
```json
{
  "verification_id": "v1v2v3v4-v5v6-v7v8-v9v10-v11v12v13v14",
  "status": "pending",
  "message": "Screenshot uploaded for verification"
}
```

### GET /verifications/pending
Get pending screenshot verification queue (verifier only)

**Response:**
```json
[
  {
    "id": "v1v2v3v4-v5v6-v7v8-v9v10-v11v12v13v14",
    "shift_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "worker_id": "550e8400-e29b-41d4-a716-446655440001",
    "screenshot_url": "/uploads/screenshots/550e8400.../a1b2c3d4.png",
    "status": "pending",
    "created_at": "2024-01-24T23:45:00Z",
    "platform": "Uber Eats",
    "shift_date": "2024-01-24",
    "gross_earnings": 178.50,
    "full_name": "Alex Thompson",
    "city": "San Francisco"
  }
]
```

### POST /verifications/{verification_id}/verify
Approve or reject a screenshot verification

**Query Parameters:**
- `verifier_id` (required) - UUID of the verifier
- `approved` (required) - boolean true/false
- `notes` (optional) - verification notes
- `confidence` (optional) - confidence score 0-1

**Response:**
```json
{
  "id": "v1v2v3v4-v5v6-v7v8-v9v10-v11v12v13v14",
  "shift_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "verified",
  "verification_notes": "Screenshot clearly shows earnings",
  "confidence_score": 0.95
}
```

### POST /csv-import
Bulk import shifts from CSV file

**Query Parameters:**
- `worker_id` (required) - UUID of the worker

**CSV Format:**
```csv
platform,date,start_time,end_time,duration_hours,gross_earnings,platform_fees,net_earnings
Uber Eats,2024-01-20,09:00:00,13:15:00,4.25,124.50,12.45,112.05
DoorDash,2024-01-21,18:00:00,22:30:00,4.50,156.00,15.60,140.40
```

**Response:**
```json
{
  "import_id": "i1i2i3i4-i5i6-i7i8-i9i10-i11i12i13i14",
  "total_rows": 15,
  "successfully_imported": 15,
  "failed_rows": 0,
  "status": "completed"
}
```

### GET /earnings/stats/{worker_id}
Get earnings statistics for a worker

**Response:**
```json
{
  "total_shifts": 12,
  "total_earnings": 4280.50,
  "total_net_earnings": 3842.15,
  "avg_hourly_rate": 34.50,
  "total_hours": 124.25
}
```

---

## 3. ANOMALY DETECTION SERVICE (Port 8003)

Statistical analysis and vulnerability detection for earnings patterns.

### POST /analyze/{worker_id}
Run comprehensive anomaly analysis on worker

**Response:**
```json
{
  "worker_id": "550e8400-e29b-41d4-a716-446655440001",
  "analysis_date": "2024-01-25T10:30:00Z",
  "total_shifts_analyzed": 25,
  "flags_detected": 3,
  "flags": [
    {
      "flag_type": "unusually_high_earnings",
      "severity": "low",
      "z_score": 2.8
    },
    {
      "flag_type": "unusual_shift_timing",
      "severity": "medium",
      "hours": [3, 4, 5]
    },
    {
      "flag_type": "platform_inconsistency",
      "severity": "high",
      "platform": "Uber Eats",
      "ratio": 0.65
    }
  ]
}
```

### GET /flags/worker/{worker_id}
Get all flags for a worker

**Query Parameters:**
- `status` (optional) - Filter by status: "open", "resolved", "dismissed"

**Response:**
```json
[
  {
    "id": "f1f2f3f4-f5f6-f7f8-f9f10-f11f12f13f14",
    "worker_id": "550e8400-e29b-41d4-a716-446655440001",
    "shift_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "flag_type": "unusually_high_earnings",
    "severity": "low",
    "description": "Single shift earnings 2.1x above city median",
    "status": "open",
    "created_at": "2024-01-25T10:30:00Z"
  }
]
```

### GET /flags/critical
Get all critical and high severity flags

**Response:**
```json
[
  {
    "id": "f1f2f3f4-f5f6-f7f8-f9f10-f11f12f13f14",
    "worker_id": "550e8400-e29b-41d4-a716-446655440004",
    "flag_type": "platform_inconsistency",
    "severity": "high",
    "description": "Reported earnings 1.8x lower than similar workers",
    "status": "open",
    "full_name": "James Wilson",
    "email": "james.wilson@example.com",
    "city": "New York"
  }
]
```

### POST /flags/{flag_id}/resolve
Mark a flag as resolved

**Request:**
```json
{
  "notes": "Worker provided explanation - earnings variation due to early morning shifts"
}
```

**Response:**
```json
{
  "status": "resolved",
  "flag_id": "f1f2f3f4-f5f6-f7f8-f9f10-f11f12f13f14"
}
```

---

## 4. GRIEVANCE SERVICE (Port 8004)

Community grievance management, discussion, and advocacy workflows.

### POST /grievances
Create a new grievance

**Request:**
```json
{
  "worker_id": "550e8400-e29b-41d4-a716-446655440001",
  "platform": "Uber",
  "title": "Unjust account deactivation without clear explanation",
  "description": "I woke up to find my account deactivated with only 'Safety Concern' cited...",
  "category": "deactivation",
  "severity": "high"
}
```

**Response:**
```json
{
  "id": "g1g2g3g4-g5g6-g7g8-g9g10-g11g12g13g14",
  "worker_id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Unjust account deactivation without clear explanation",
  "description": "I woke up to find my account deactivated...",
  "status": "open",
  "created_at": "2024-01-25T10:30:00Z"
}
```

### GET /grievances
List grievances with optional filtering

**Query Parameters:**
- `status` (optional) - Filter by status: "open", "in_review", "resolved", "escalated", "closed"
- `platform` (optional) - Filter by platform name
- `limit` (optional, default 20) - Number of results
- `offset` (optional, default 0) - Pagination offset
- `sort` (optional) - Sort field: "created_at", "likes_count", "severity"

**Example:** `/grievances?status=open&platform=Uber&limit=10&sort=created_at`

**Response:**
```json
[
  {
    "id": "g1g2g3g4-g5g6-g7g8-g9g10-g11g12g13g14",
    "worker_id": "550e8400-e29b-41d4-a716-446655440001",
    "platform": "Uber",
    "title": "Unjust account deactivation without clear explanation",
    "description": "I woke up to find my account deactivated...",
    "category": "deactivation",
    "severity": "high",
    "status": "in_review",
    "likes_count": 245,
    "comments_count": 18,
    "created_at": "2024-01-25T10:30:00Z",
    "full_name": "Alex Thompson",
    "city": "San Francisco"
  }
]
```

### GET /grievances/{id}
Get single grievance with comments

**Response:**
```json
{
  "id": "g1g2g3g4-g5g6-g7g8-g9g10-g11g12g13g14",
  "worker_id": "550e8400-e29b-41d4-a716-446655440001",
  "platform": "Uber",
  "title": "Unjust account deactivation without clear explanation",
  "description": "...",
  "status": "in_review",
  "likes_count": 245,
  "comments_count": 18,
  "assigned_advocate_id": "550e8400-e29b-41d4-a716-446655440020",
  "full_name": "Alex Thompson",
  "email": "alex.thompson@example.com",
  "city": "San Francisco",
  "comments": [
    {
      "id": "c1c2c3c4-c5c6-c7c8-c9c10-c11c12c13c14",
      "user_id": "550e8400-e29b-41d4-a716-446655440002",
      "content": "I had the exact same issue! Deactivated with no explanation...",
      "likes_count": 45,
      "created_at": "2024-01-25T11:15:00Z",
      "full_name": "Jordan Smith",
      "role": "worker"
    }
  ]
}
```

### POST /grievances/{id}/comments
Add comment to grievance

**Request:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440002",
  "content": "I had the exact same issue! Deactivated with no explanation..."
}
```

**Response:**
```json
{
  "id": "c1c2c3c4-c5c6-c7c8-c9c10-c11c12c13c14",
  "user_id": "550e8400-e29b-41d4-a716-446655440002",
  "content": "I had the exact same issue...",
  "created_at": "2024-01-25T11:15:00Z"
}
```

### POST /grievances/{id}/like
Like a grievance (increments likes_count)

**Response:**
```json
{
  "id": "g1g2g3g4-g5g6-g7g8-g9g10-g11g12g13g14",
  "likes_count": 246
}
```

### POST /grievances/{id}/assign
Assign grievance to advocate

**Request:**
```json
{
  "advocate_id": "550e8400-e29b-41d4-a716-446655440020",
  "status": "in_review"
}
```

**Response:**
```json
{
  "id": "g1g2g3g4-g5g6-g7g8-g9g10-g11g12g13g14",
  "assigned_advocate_id": "550e8400-e29b-41d4-a716-446655440020",
  "status": "in_review"
}
```

### POST /grievances/{id}/resolve
Mark grievance as resolved

**Request:**
```json
{
  "resolution_notes": "Account reactivated after investigation. No safety violations found."
}
```

**Response:**
```json
{
  "id": "g1g2g3g4-g5g6-g7g8-g9g10-g11g12g13g14",
  "status": "resolved",
  "resolved_at": "2024-01-28T15:45:00Z"
}
```

### GET /moderation/flagged
Get flagged comments for review

**Response:**
```json
[
  {
    "id": "c1c2c3c4-c5c6-c7c8-c9c10-c11c12c13c14",
    "grievance_id": "g1g2g3g4-g5g6-g7g8-g9g10-g11g12g13g14",
    "user_id": "550e8400-e29b-41d4-a716-446655440005",
    "content": "Inappropriate language...",
    "is_flagged": true,
    "is_moderated": false,
    "created_at": "2024-01-25T11:15:00Z",
    "title": "Unjust account deactivation...",
    "full_name": "Sarah Johnson"
  }
]
```

### POST /moderation/comments/{id}/approve
Approve comment for visibility

**Response:**
```json
{
  "id": "c1c2c3c4-c5c6-c7c8-c9c10-c11c12c13c14",
  "is_moderated": true
}
```

### GET /stats
Get platform and grievance statistics

**Response:**
```json
{
  "platform_stats": [
    {
      "platform": "Uber",
      "total_grievances": 42,
      "resolved": 28,
      "avg_resolution_days": 4.2
    },
    {
      "platform": "DoorDash",
      "total_grievances": 35,
      "resolved": 22,
      "avg_resolution_days": 3.8
    }
  ],
  "severity_stats": [
    {
      "severity": "critical",
      "count": 8,
      "resolved": 5
    },
    {
      "severity": "high",
      "count": 24,
      "resolved": 16
    }
  ],
  "recent_cases": [...]
}
```

---

## Error Responses

All services return standard error format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication

For protected endpoints, include JWT token in header:

```
Authorization: Bearer <jwt_token>
```

Token obtained from `POST /auth/login` on Auth Service.

---

## Testing Services

### Using curl
```bash
# Login
curl -X POST http://localhost:8001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alex.thompson@example.com","password":"hashed_pwd_1"}'

# Get shifts
curl -X GET "http://localhost:8002/shifts/550e8400-e29b-41d4-a716-446655440001" \
  -H "Authorization: Bearer <token>"

# List grievances
curl -X GET "http://localhost:8004/grievances?status=open&limit=10"

# Analyze worker
curl -X POST "http://localhost:8003/analyze/550e8400-e29b-41d4-a716-446655440001" \
  -H "Authorization: Bearer <token>"
```

### Using Postman
Import this collection:
- Auth: `POST localhost:8001/auth/login`
- Earnings: `GET localhost:8002/shifts/{worker_id}`
- Anomaly: `POST localhost:8003/analyze/{worker_id}`
- Grievance: `GET localhost:8004/grievances`

---

## Rate Limiting

Currently not enforced. In production, implement:
- 100 requests per minute per IP
- 50 requests per minute per authenticated user
- Exponential backoff for failed attempts

---

## Database Schema

See `scripts/01_init_schema.sql` for complete schema definition.

Key tables:
- `users` - Platform users with roles
- `shifts` - Worker earnings records
- `screenshot_verifications` - Verification queue
- `anomaly_flags` - Detected patterns
- `grievances` - Worker complaints
- `earnings_aggregation` - City-wide statistics

