from datetime import timedelta, datetime
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import User
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from db import crud
from jose import jwt
from fastapi import Depends, HTTPException, APIRouter

SECRET_KEY = ""
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 40
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
revoked_tokens = set()


router = APIRouter()


@router.post("/login", tags=["Authentication"])
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user": User.return_login(user)}


@router.post("/login-admin", tags=["Authentication Admin"])
def login_admin(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    if user.is_admin is False:
        raise HTTPException(status_code=401, detail="User is not admin")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout", tags=["Authentication"])
def logout(token: str = Depends(oauth2_scheme)):
    revoked_tokens.add(token)
    return {"message": "Logout successful"}


def authenticate_user(db: Session, email_or_username: str, password: str):
    user = crud.get_user_by_email(db, email_or_username)
    if not user:
        user = crud.get_user_by_username(db, email_or_username)
    if not user:
        return False
    if not User.verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
