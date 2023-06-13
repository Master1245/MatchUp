from typing import Optional, List
from jose import jwt, JWTError
from api.auth import SECRET_KEY, ALGORITHM, oauth2_scheme, revoked_tokens
from db import crud
from db.database import SessionLocal
from db.models import User
from fastapi import Depends, HTTPException, APIRouter, Query

router = APIRouter()


@router.get("/users/me", tags=["Users"])
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


@router.get("/users/summary", tags=["Users"])
def get_user_summary(token: str = Depends(oauth2_scheme), params: Optional[str] = Query(None)):
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

        if params:
            param_list = [param.strip() for param in params.split(",")]
            user_summary = {param: getattr(user, param) for param in param_list if
                            hasattr(user, param) and param != 'hashed_password'}
        else:
            user_summary = user.__dict__

        return user_summary
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
