# app/schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SkinAnalysisCreate(BaseModel):
    user_id: int
    photo_path: str
    skin_condition: str
    skin_report: str

class SkinAnalysis(SkinAnalysisCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
