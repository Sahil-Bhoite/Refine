from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Refine API",
    description="Backend for the Refine resume optimization app",
    version="1.0.0"
)

# Allow CORS for local frontend development (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "https://refine-frontend.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import resume_processing
app.include_router(resume_processing.router)

@app.get("/")
def read_root():
    return {"message": "Refine API is running."}
