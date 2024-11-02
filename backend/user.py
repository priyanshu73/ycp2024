from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from pydantic import BaseModel


router = APIRouter()

# Define your Pydantic schemas here
class UserCreate(BaseModel):
    name: str
    email: str
    skin_oiliness: float

class User(UserCreate):
    id: int

    class Config:
        orm_mode = True

@router.post("/users/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users/{user_id}", response_model=User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    # Retrieve the user by ID
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db_user

@router.get("/users/email/{email}", response_model=User)
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    # Retrieve the user by email
    db_user = db.query(models.User).filter(models.User.email == email).first()
    
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db_user