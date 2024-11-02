from fastapi import FastAPI
import user
from database import engine
import models
import uvicorn
from dotenv import load_dotenv
import os
import skin_analysis

# Load environment variables
load_dotenv()

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Skin Analysis API")

# Include user routes
app.include_router(user.router, prefix="/api")

# Include skin analysis routes
app.include_router(skin_analysis.router, prefix="/api")