# FairGig 🇵🇰 — Gig Worker Income & Rights Platform

## SOFTEC 2026 — Web Dev Competition

FairGig is a comprehensive platform designed to empower millions of Pakistani gig workers (Foodpanda riders, Careem drivers, Daraz delivery agents, etc.) by providing them with a unified system to log, verify, and protect their earnings.

### 🌟 Key Features

- **Kamaai Logger (Earnings Tracker)**: Workers can log shifts across multiple Pakistani platforms (Foodpanda, Careem, Bykea, Daraz). Supports bulk CSV import.
- **Certified Income Statements**: Generate print-friendly, verifiable income certificates in PKR for use with banks or landlords.
- **Shikayat Board (Grievance System)**: A community-driven board for workers to report deactivations, commission hikes, and systemic issues.
- **Advocate Analytics**: High-level dashboard for labour advocates to spot patterns like sudden income drops or city-wide commission spikes.
- **Anomaly Detection**: AI-powered service (FastAPI) that flags statistically unusual deductions or suspicious platform behavior.

### 🛠️ Tech Stack & Architecture

FairGig is built using a modern microservices architecture to ensure scalability and separation of concerns:

- **Frontend**: Next.js (React) with Tailwind CSS for a premium, responsive experience.
- **Auth Service (8001)**: Python FastAPI (JWT-based, role-based access).
- **Earnings Service (8002)**: Python FastAPI (CRUD for shifts, CSV processing).
- **Anomaly Service (8003)**: Python FastAPI (Statistical detection logic).
- **Grievance Service (8004)**: Node.js Express (Complaint management & community board).
- **Analytics Service (8005)**: Python FastAPI (Aggregate KPIs & trends).
- **Certificate Renderer (8006)**: Node.js (Generates verifiable income statements).
- **Database**: Supabase (PostgreSQL) with Row Level Security (RLS).

### 🗄️ Database Justification
We chose **PostgreSQL (via Supabase)** for its strong consistency, advanced relational capabilities, and built-in **Row Level Security (RLS)**. RLS is critical for FairGig as it allows us to strictly enforce that workers can only access their own sensitive data, while allowing Advocates to query anonymized, aggregated trends (via pre-computed views/tables) without ever exposing individual worker identities.

---

### 📝 API Documentation (SOFTEC Requirement)

All services are independently runnable and communicate via REST APIs.

#### 1. Anomaly Service (`/analyze`)
Exposes detection logic for statistical outliers in earnings.
- **Endpoint**: `POST /analyze`
- **Logic**: Uses Z-Score analysis to flag shifts >2σ from the worker's mean and tracks commission rate deviations >20%.

#### 2. Auth Service
- `POST /auth/login`: Authenticates user and returns JWT.
- `GET /auth/verify`: Validates token for inter-service communication.

#### 3. Earnings Service
- `POST /shifts`: Logs new shift.
- `POST /csv-import`: Handles bulk upload.

#### 4. Grievance Service
- `POST /grievances`: Submits worker complaint.
- `GET /grievances`: Lists public board.

---

### 🚀 Getting Started

#### Prerequisites
- Node.js & pnpm
- Python 3.12+
- Supabase Account (keys in `.env.local`)

#### Running Locally

1. **Frontend**:
   ```bash
   pnpm install && pnpm dev
   ```

2. **Backend Services** (Run in separate terminals):
   - **Auth**: `cd backend/services/auth_service && python main.py`
   - **Earnings**: `cd backend/services/earnings_service && python main.py`
   - **Anomaly**: `cd backend/services/anomaly_service && python main.py`
   - **Grievance**: `cd backend/services/grievance_service && npm start`
   - **Analytics**: `cd backend/services/analytics_service && python main.py`
   - **Certificate**: `cd backend/services/certificate_renderer && npm start`

---

### 🇵🇰 Pakistani Localization

- All currency in **PKR**.
- Pre-loaded with major Pakistani platforms: **Foodpanda, Careem, Daraz, Bykea**.
- Seeded with Pakistani personas and data across cities like **Karachi, Lahore, Islamabad**.
- UI labels in a mix of English and Roman Urdu for better accessibility.

---

### 👥 Submission Details

**Mandatory Contributors**:
- mm037925@gmail.com
- moeezsalman246@gmail.com

---
*Developed for SOFTEC 2026 by Team FairGig.*
