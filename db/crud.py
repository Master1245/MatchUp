from sqlalchemy.orm import Session
from . import models, schemas
from .models import User, Preference


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = User(username=user.username, email=user.email, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user: schemas.User):
    db.delete(user)
    db.commit()
    return True


def add_hobbie(db: Session, user: User, hobbie_id: int):
    hobbie = db.query(models.Hobby).filter(models.Hobby.id == hobbie_id).first()
    if hobbie is None:
        return False
    user.hobbies.append(hobbie)
    db.commit()
    return True


def remove_hobbie(db: Session, user: User, hobbie_id: int):
    hobbie = db.query(models.Hobby).filter(models.Hobby.id == hobbie_id).first()
    if hobbie is None:
        return False
    user.hobbies.remove(hobbie)
    db.commit()
    return True


def create_preference(db: Session, name: str):
    preference = Preference(name=name)
    db.add(preference)
    db.commit()
    db.refresh(preference)
    return preference


def add_preference(db: Session, user: User, preference_id: int):
    preference = db.query(models.Preference).filter(models.Preference.id == preference_id).first()
    if preference is None:
        return False
    user.preferences.append(preference)
    db.commit()
    return True


def remove_preference(db: Session, user: User, preference_id: int):
    preference = db.query(models.Preference).filter(models.Preference.id == preference_id).first()
    if preference is None:
        return False
    user.preferences.remove(preference)
    db.commit()
    return True


def comment_hobby(db: Session, hobby_id: int, comment: str):
    hobby = db.query(models.Hobby).filter(models.Hobby.id == hobby_id).first()
    if hobby is None:
        return False
    hobby.comment = comment
    db.commit()
    return True


def comment_preference(db: Session, preference_id: int, comment: str):
    preference = db.query(models.Preference).filter(models.Preference.id == preference_id).first()
    if preference is None:
        return False
    preference.comment = comment
    db.commit()
    return True


def get_hobbies(db: Session):
    return db.query(models.Hobby).all()


def get_hobbies_from_user(db: Session, user_id: int):
    return db.query(models.Hobby).join(models.Hobby.users).filter(models.User.id == user_id).all()


def get_preferences(db: Session):
    return db.query(models.Preference).all()


def get_preferences_from_user(db: Session, user_id: int):
    return db.query(models.Preference).join(models.Preference.users).filter(models.User.id == user_id).all()
