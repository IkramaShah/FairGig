from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FairGig Analytics Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "healthy", "service": "analytics"}

@app.get("/analytics/kpis")
def get_kpis():
    # Placeholder for aggregate KPIs
    return {
        "platform_commission_trends": {
            "foodpanda": 25,
            "careem": 22,
            "daraz": 18
        },
        "income_distribution": {
            "karachi": 42000,
            "lahore": 38000,
            "islamabad": 45000
        },
        "vulnerability_count": 5
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)
