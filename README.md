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

FairGig is built using a modern microservices architecture:

- **Frontend**: Next.js (React) with Tailwind CSS.
- **Auth Service**: Python FastAPI (JWT-based, role-based access).
- **Earnings Service**: Python FastAPI (CRUD, CSV processing).
- **Anomaly Service**: Python FastAPI (Statistical detection logic).
- **Grievance Service**: Node.js Express (Complaint management).
- **Database**: Supabase (PostgreSQL) with Row Level Security (RLS) for data privacy.

### 🇵🇰 Pakistani Localization

- All currency in **PKR**.
- Pre-loaded with major Pakistani platforms: **Foodpanda, Careem, Daraz, Bykea**.
- Seeded with Pakistani personas and data across cities like **Karachi, Lahore, Islamabad**.
- UI labels in a mix of English and Roman Urdu for better accessibility.

---

### 🚀 Getting Started

#### Prerequisites
- Node.js & pnpm
- Python 3.12+
- Supabase Account

#### Running Locally

1. **Frontend**:
   ```bash
   pnpm install
   pnpm dev
   ```

2. **Backend Services** (Run each in a separate terminal):
   - **Auth**: `cd backend/services/auth_service && python main.py`
   - **Earnings**: `cd backend/services/earnings_service && python main.py`
   - **Anomaly**: `cd backend/services/anomaly_service && python main.py`
   - **Grievance**: `cd backend/services/grievance_service && npm start`

---

### 📝 API Documentation

All inter-service API contracts are documented in the code and follow standard REST patterns. The Anomaly Service exposes a `POST /analyze` endpoint that handles the core detection logic.

### 👥 Submission Details

**Mandatory Contributors**:
- mm037925@gmail.com
- moeezsalman246@gmail.com

---
*Developed for SOFTEC 2026 by Team FairGig.*
