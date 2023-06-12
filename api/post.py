from db import schemas
from sqlalchemy.orm import Session
from db import crud
from db.database import get_db
from db.models import User
from fastapi import Depends, HTTPException, APIRouter

router = APIRouter()


@router.post("/users/", tags=["Users"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = User.get_password_hash(user.password)
    user.password = hashed_password
    user_save = crud.create_user(db=db, user=user)
    user_json = User.return_login(user_save)
    return user_json
