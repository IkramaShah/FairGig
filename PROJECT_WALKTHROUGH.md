# 🇵🇰 FairGig — SOFTEC 2026 Project Walkthrough

This document provides a comprehensive overview of the FairGig platform, its architecture, and the logic behind its features. Use this to prepare for your project demonstration and to answer questions from the judges.

---

## 🎯 Project Goal
FairGig is a **Worker Advocacy Platform** designed to solve the "Black Box" problem in the Pakistani gig economy. Millions of workers (Foodpanda riders, Careem drivers, etc.) earn income across multiple platforms but have no unified record of their earnings, no proof of income for banks, and no way to know if they are being paid fairly compared to their peers.

---

## 🏗️ Architecture: Microservices
We chose a **Microservice Architecture** to ensure that each core function of the platform can scale independently and to demonstrate a professional, enterprise-level system design.

### 1. Frontend (React / Next.js)
- **Role**: The central interface for workers and advocates.
- **Tech**: Next.js 15+, Tailwind CSS, Lucide Icons, Recharts.
- **Key Feature**: Role-based routing (Worker vs. Advocate view).

### 2. Backend Services (Polyglot Stack)
| Service | Tech | Responsibility |
| :--- | :--- | :--- |
| **Auth Service** | Python (FastAPI) | Secure JWT authentication and role management. |
| **Earnings Service** | Python (FastAPI) | Shift logging, CSV bulk imports, and data storage. |
| **Anomaly Service** | Python (FastAPI) | **The "Brain"**: Uses statistical Z-scores to flag unfair pay. |
| **Grievance Service** | Node.js (Express) | Anonymous community board for labor rights issues. |
| **Analytics Service** | Python (FastAPI) | Calculates city-wide medians and advocate KPIs. |
| **Certificate Renderer** | Node.js | Generates professional, print-ready income statements. |

---

## 📊 Feature Deep-Dive

### 1. The Earnings Logger
Workers can log shifts from **Foodpanda, Careem, Daraz, Bykea, and Uber**. 
- **The Value**: Converts scattered app history into a single, unified financial record.
- **Verification**: Workers upload screenshots; advocates verify them to "unlock" official certificates.

### 2. Anomaly Detection Logic
How do we know if a platform is being "unfair"?
- Our **Anomaly Service** compares a worker's current shift data against their historical average and the city-wide median.
- If a shift has a >20% deduction or a significantly lower hourly rate, it is automatically **Flagged** for the worker to see.

### 3. Advocate Analytics Panel
Built for labor unions and organizers.
- **Vulnerability Flags**: Shows which workers have had the sharpest income drops in the last 30 days.
- **City Medians**: Shows the "Real" hourly wage in Lahore vs. Karachi vs. Islamabad, based on crowdsourced data.

### 4. Verified Income Certificates
- Generates a professional PDF/Print layout.
- **Use Case**: Allows a Foodpanda rider to apply for a bank loan or rent an apartment by providing "Verified Proof of Income."

---

## 🛠️ Technology Stack & Justification

- **PostgreSQL (Supabase)**: We chose Postgres for its robust relational features and **Row Level Security (RLS)**. RLS ensures that a worker can ONLY see their own data, keeping their financial history private and secure.
- **FastAPI**: Chosen for its high performance and automatic Swagger/OpenAPI documentation.
- **Node.js**: Used for the Grievance service to demonstrate full-stack polyglot capability.

---

## 🇵🇰 Social Impact (The "Win" for SOFTEC)
- **Financial Inclusion**: Bringing informal workers into the formal financial fold.
- **Transparency**: Moving from "Algorithm-led" pay to "Data-led" advocacy.
- **Collective Bargaining**: Giving workers the data they need to negotiate better rates with platforms.

---

## ❓ Frequently Asked Questions for Judges

**Q: Why not just use one backend?**
*A: Microservices allow us to isolate high-compute tasks (like Anomaly Detection) from simple tasks (like Grievance logs). It also allows different teams to use the best tool for the job (e.g., Python for data analysis, Node for real-time services).*

**Q: How do you handle data privacy?**
*A: We use Supabase Auth and PostgreSQL RLS. Every database query is scoped to the `auth.uid()`, meaning no user can ever access another user's earnings data.*

**Q: Is the anomaly detection AI?**
*A: It uses Statistical Inference (Z-scores). We chose this over a "Black Box" AI model to ensure our fairness flags are explainable and transparent to the workers.*
