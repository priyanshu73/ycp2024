from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    skin_oiliness = Column(Float)
    
    # Relationship with skin analyses
    analyses = relationship("SkinAnalysis", back_populates="user")

class SkinAnalysis(Base):
    __tablename__ = "skin_analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    photo_path = Column(String(255))
    skin_condition = Column(String(100))
    skin_report = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship with user
    user = relationship("User", back_populates="analyses")