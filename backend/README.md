# FairGig Multi-Service Backend Architecture

This directory contains the microservices that power the FairGig Advocacy Platform. Each service handles specific business domains and communicates via REST APIs.

## Services Overview

### 1. Auth Service (FastAPI)
**Port: 8001**
- User registration and authentication
- JWT token generation and verification
- Role-based access control (worker, verifier, advocate)
- User profile management

**Key Endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login, returns JWT token
- `GET /auth/verify?token=...` - Verify JWT token
- `GET /auth/user/{user_id}` - Get user details

### 2. Earnings Service (FastAPI)
**Port: 8002**
- Worker shift logging (manual entry)
- CSV bulk import for historical earnings
- Screenshot verification workflow
- Real-time earnings aggregation and statistics
- Worker earnings dashboard data

**Key Endpoints:**
- `POST /shifts` - Create new shift entry
- `GET /shifts/{worker_id}` - Get worker's shifts
- `POST /shifts/{shift_id}/screenshot` - Upload shift screenshot
- `GET /verifications/pending` - Get pending verification queue
- `POST /verifications/{verification_id}/verify` - Approve/reject screenshot
- `POST /csv-import` - Bulk import shifts from CSV
- `GET /earnings/stats/{worker_id}` - Get worker earnings stats

### 3. Anomaly Detection Service (FastAPI)
**Port: 8003**
- Statistical analysis of earnings patterns
- Outlier detection using Z-score analysis
- Unusual temporal patterns
- Platform earnings comparison
- Automated vulnerability flagging

**Key Endpoints:**
- `POST /analyze/{worker_id}` - Run full anomaly analysis
- `GET /flags/worker/{worker_id}` - Get flags for specific worker
- `GET /flags/critical` - Get all critical severity flags
- `POST /flags/{flag_id}/resolve` - Mark flag as resolved

### 4. Grievance Service (Node.js/Express)
**Port: 8004**
- Worker grievance posting and management
- Community discussion via comments
- Advocate assignment and case management
- Comment moderation and flagging
- Grievance resolution tracking
- Platform-wide statistics

**Key Endpoints:**
- `POST /grievances` - Create new grievance
- `GET /grievances` - List grievances (with filters)
- `GET /grievances/:id` - Get grievance with comments
- `POST /grievances/:id/comments` - Add comment
- `POST /grievances/:id/assign` - Assign to advocate
- `POST /grievances/:id/resolve` - Mark resolved
- `GET /moderation/flagged` - Get flagged comments
- `POST /moderation/comments/:id/approve` - Approve comment
- `GET /stats` - Platform statistics

## Database Setup

### Initialize Database

1. **Run migrations:**
```bash
psql $POSTGRES_URL < ../scripts/01_init_schema.sql
```

2. **Seed test data:**
```bash
psql $POSTGRES_URL < ../scripts/02_seed_data.sql
```

This creates:
- 8 test users (5 workers, 2 verifiers, 1 advocate)
- 25 realistic shift entries across major platforms
- 5 income certificates
- 5 grievances with community comments
- City-wide earnings aggregation data
- Anomaly flags for pattern analysis

## Starting Services

### Option 1: Start All Services (Development)

```bash
# From /vercel/share/v0-project/backend

# Terminal 1 - Auth Service
cd services/auth_service && python main.py

# Terminal 2 - Earnings Service
cd services/earnings_service && python main.py

# Terminal 3 - Anomaly Service
cd services/anomaly_service && python main.py

# Terminal 4 - Grievance Service
cd services/grievance_service && npm install && npm start
```

### Option 2: Docker Compose (Coming Soon)

```bash
docker-compose up --build
```

## Service Communication Flow

```
Frontend (Next.js/React) 
    ↓
API Gateway (Optional - could be added)
    ├→ Auth Service (8001) - JWT validation
    ├→ Earnings Service (8002) - Shifts, CSV, verification
    ├→ Anomaly Service (8003) - Flag detection
    └→ Grievance Service (8004) - Grievances, moderation
    
All Services ↔ PostgreSQL Database
```

## Environment Variables

Required in `.env`:
```
POSTGRES_URL=postgresql://user:password@host/fairgig
SUPABASE_JWT_SECRET=your-secret-key
```

Optional:
```
AUTH_SERVICE_PORT=8001
EARNINGS_SERVICE_PORT=8002
ANOMALY_SERVICE_PORT=8003
GRIEVANCE_SERVICE_PORT=8004
```

## Testing Services

### Test Auth Service
```bash
curl -X POST http://localhost:8001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex.thompson@example.com",
    "password": "hashed_pwd_1"
  }'
```

### Test Earnings Service
```bash
curl -X GET "http://localhost:8002/shifts/550e8400-e29b-41d4-a716-446655440001"
```

### Test Grievance Service
```bash
curl -X GET "http://localhost:8004/grievances?status=open&limit=10"
```

### Test Anomaly Analysis
```bash
curl -X POST "http://localhost:8003/analyze/550e8400-e29b-41d4-a716-446655440001"
```

## API Documentation

Each service provides auto-generated API docs:
- Auth Service: http://localhost:8001/docs
- Earnings Service: http://localhost:8002/docs
- Anomaly Service: http://localhost:8003/docs
- Grievance Service: http://localhost:8004/redoc (via express-swagger-ui plugin if added)

## Data Models

### Key Tables

**users** - All platform users with roles
**shifts** - Individual earnings records
**screenshot_verifications** - Verification queue and history
**anomaly_flags** - Detected issues and patterns
**grievances** - Worker complaints and issues
**grievance_comments** - Community discussion
**earnings_aggregation** - City-wide statistics (cached)
**income_certificates** - Official verified statements

## Security Notes

⚠️ **Development Only**
- JWT_SECRET must be changed in production
- Passwords must be validated properly
- Add rate limiting on auth endpoints
- Implement request logging and monitoring
- Use HTTPS in production
- Add API key authentication between services

## Contributing

When adding new endpoints:
1. Update the relevant service README
2. Add database migration if schema changes
3. Update frontend API client
4. Add integration tests
5. Document response schemas

## Troubleshooting

**Service won't connect to database:**
- Check POSTGRES_URL format
- Verify PostgreSQL is running
- Ensure migrations have been run

**JWT verification fails:**
- Ensure SUPABASE_JWT_SECRET matches across services
- Check token expiration (24 hours default)

**CSV import hangs:**
- Check file format (must be UTF-8)
- Verify column names match expected fields
- Check for very large files (implement chunking if needed)
