from api.get import get_current_user
from db import schemas
from sqlalchemy.orm import Session
from db import crud
from db.database import get_db
from db.models import User
from fastapi import Depends, HTTPException, APIRouter

router = APIRouter()


@router.post("/user/hobbie/add", tags=["Hobbies"])
def add_hobbie(hobbie_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    crud.add_hobbie(db, current_user, hobbie_id)
    return {"message": "Hobbie added"}


@router.post("/user/hobbie/remove", tags=["Hobbies"])
def remove_hobbie(hobbie_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    crud.remove_hobbie(db, current_user, hobbie_id)
    return {"message": "Hobbie removed"}


@router.post("/user/hobbie/comment", tags=["Hobbies"])
def comment_hobbie(hobbie_id: int, comment: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    crud.comment_hobby(db, hobbie_id, comment)
    return {"message": "Comment added"}


@router.post("/preference/", tags=["Preferences"])
def create_preference(name: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    crud.create_preference(db, name)
    return {"message": "Preference created"}


@router.post("/user/preference/add", tags=["Preferences"])
def add_preference(preference_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    crud.add_preference(db, current_user, preference_id)
    return {"message": "Preference added"}


@router.post("/user/preference/remove", tags=["Preferences"])
def remove_preference(preference_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    crud.remove_preference(db, current_user, preference_id)
    return {"message": "Preference removed"}


@router.post("/user/preference/comment", tags=["Preferences"])
def comment_preference(preference_id: int, comment: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    crud.comment_preference(db, preference_id, comment)
    return {"message": "Comment added"}


@router.post("/users/", tags=["Users"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = User.get_password_hash(user.password)
    user.password = hashed_password
    user_save = crud.create_user(db=db, user=user)
    user_json = User.return_login(user_save)
    return user_json
