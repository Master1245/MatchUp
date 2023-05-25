from sqlalchemy.orm import Session
from . import models, schemas
from .models import User


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = User.format_to_db(user)
    print(db_user.is_admin)
    print(db_user.id)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    print(db_user.is_admin)
    print(db_user.id)
    return db_user


def delete_user(db: Session, user: schemas.User):
    db.delete(user)
    db.commit()
    return True
