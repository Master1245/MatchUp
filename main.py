from datetime import timedelta, datetime
from typing import Optional

from jose import JWTError, jwt
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db import crud, models, schemas
from db.database import SessionLocal, engine
from db.models import User
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)
app = FastAPI()
SECRET_KEY = "seu_secret_key_aqui"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 40
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
revoked_tokens = set()

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5000",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", tags=["Users"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = User.get_password_hash(user.password)
    user.password = hashed_password
    user_save = crud.create_user(db=db, user=user)
    user_json = User.return_login(user_save)
    return user_json


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


@app.post("/login", tags=["Authentication"])
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user": User.return_login(user)}


@app.post("/logout", tags=["Authentication"])
def logout(token: str = Depends(oauth2_scheme)):
    revoked_tokens.add(token)
    return {"message": "Logout successful"}


@app.post("/login-admin", tags=["Authentication Admin"])
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


@app.get("/users/me", tags=["Users"])
def read_user_me(token: str = Depends(oauth2_scheme)):
    if token in revoked_tokens:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        db = SessionLocal()
        user = crud.get_user_by_email(db, email=email)
        db.close()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return User.to_dict_api(user)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication token")


@app.get("/users/summary", tags=["Users"])
def get_user_summary(token: str = Depends(oauth2_scheme), params: list[str] = []):
    if token in revoked_tokens:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        db = SessionLocal()
        user = crud.get_user_by_email(db, email=email)
        db.close()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        # Remove 'hashed_password' do dicionário user_summary, se presente
        user_summary = {param: getattr(user, param) for param in params if
                        hasattr(user, param) and param != 'hashed_password'}

        return user_summary
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication token")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
