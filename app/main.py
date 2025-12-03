"""
Frame Fables LLC - Automation Backend
Main FastAPI application for social media content automation.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import logging
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    logger.info("Starting Frame Fables Automation Backend")

    # Initialize database
    from app.database import init_db
    logger.info("Initializing database")
    init_db()

    # Ensure reports directory exists
    os.makedirs("reports", exist_ok=True)
    logger.info("Reports directory ready")

    yield

    # Shutdown
    logger.info("Shutting down Frame Fables Automation Backend")


# Create FastAPI app
app = FastAPI(
    title="Frame Fables Automation Backend",
    description="Social media content automation system for Frame Fables LLC",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for PDF reports
app.mount("/reports", StaticFiles(directory="reports"), name="reports")

# Import routers
from app.routes import webhooks, clients, content, automation

# Include routers
app.include_router(webhooks.router)
app.include_router(clients.router)
app.include_router(content.router)
app.include_router(automation.router)


@app.get("/")
def root():
    """
    Root endpoint - API health check.
    """
    return {
        "service": "Frame Fables Automation Backend",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "docs": "/docs",
            "webhooks": "/webhooks",
            "clients": "/clients",
            "content": "/clients/{client_id}/*",
            "automation": "/automation",
            "reports": "/reports"
        }
    }


@app.get("/health")
def health_check():
    """
    Health check endpoint for monitoring.
    """
    # Check environment variables
    required_vars = [
        "OPENAI_API_KEY",
        "NOTION_API_KEY",
        "NOTION_CRM_DATABASE_ID",
        "BUFFER_ACCESS_TOKEN",
        "MAILERLITE_API_KEY"
    ]

    missing_vars = [var for var in required_vars if not os.getenv(var)]

    if missing_vars:
        logger.warning(f"Missing environment variables: {missing_vars}")
        return {
            "status": "degraded",
            "message": "Some integrations may not work",
            "missing_config": missing_vars
        }

    return {
        "status": "healthy",
        "database": "connected",
        "integrations": {
            "openai": bool(os.getenv("OPENAI_API_KEY")),
            "notion": bool(os.getenv("NOTION_API_KEY")),
            "buffer": bool(os.getenv("BUFFER_ACCESS_TOKEN")),
            "mailerlite": bool(os.getenv("MAILERLITE_API_KEY"))
        }
    }


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))

    logger.info(f"Starting server on port {port}")

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True
    )
