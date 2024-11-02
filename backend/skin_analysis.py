from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db

router = APIRouter()

@router.post("/skin_analysis/", response_model=schemas.SkinAnalysis)
def create_skin_analysis(skin_analysis: schemas.SkinAnalysisCreate, db: Session = Depends(get_db)):
    # Create and add the new skin analysis record
    db_analysis = models.SkinAnalysis(**skin_analysis.dict())
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

@router.get("/skin_analysis/{analysis_id}", response_model=schemas.SkinAnalysis)
def get_skin_analysis(analysis_id: int, db: Session = Depends(get_db)):
    # Retrieve the skin analysis record by ID
    db_analysis = db.query(models.SkinAnalysis).filter(models.SkinAnalysis.id == analysis_id).first()
    
    if db_analysis is None:
        raise HTTPException(status_code=404, detail="Skin analysis not found")
    
    return db_analysis


