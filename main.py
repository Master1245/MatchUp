from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from db import crud, models, schemas
from db.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.delete("/users/{email}")
def delete_user(email: str, db: Session = Depends(get_db)):
    print(email)
    db_user = crud.get_user_by_email(db, email=email)
    if db_user:
        crud.delete_user(db=db, user=db_user)
        return {"message": "User deleted"}
    else:
        raise HTTPException(status_code=400, detail="User not found")
