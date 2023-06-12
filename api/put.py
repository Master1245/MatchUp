from jose import jwt, JWTError
from api.auth import SECRET_KEY, ALGORITHM, oauth2_scheme, revoked_tokens
from db import crud, schemas
from db.database import SessionLocal
from db.models import User
from fastapi import Depends, HTTPException, APIRouter

router = APIRouter()


@router.put("/users/me", tags=["Users"])
def update_user_me(token: str = Depends(oauth2_scheme), user: schemas.UserUpdate = Depends()):
    if token in revoked_tokens:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        db = SessionLocal()
        db_user = crud.get_user_by_email(db, email=email)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        user_dict = user.dict(exclude_unset=True)
        for key, value in user_dict.items():
            setattr(db_user, key, value)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        db.close()
        return User.to_dict_api(db_user)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
