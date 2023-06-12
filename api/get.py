from jose import jwt, JWTError
from api.base_api import app, revoked_tokens
from api.session import SECRET_KEY, ALGORITHM, oauth2_scheme
from fastapi import Depends, HTTPException
from db import crud
from db.database import SessionLocal
from db.models import User


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

        user_summary = {param: getattr(user, param) for param in params if
                        hasattr(user, param) and param != 'hashed_password'}

        return user_summary
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
