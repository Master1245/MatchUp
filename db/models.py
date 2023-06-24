import uuid
from passlib.context import CryptContext
from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True, default=str(uuid.uuid4()))
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    bio = Column(String)
    avatar = Column(String)
    minimal_score = Column(String)
    local = Column(String)
    social_media = Column(String)
    hobbies_comment = Column(String)
    preferences = Column(String)
    list_hobbies = relationship("Hobby", secondary="user_hobby", backref="users")

    @classmethod
    def return_login(cls, user):
        return User(id=str(user.id),
                    username=user.username,
                    avatar=user.avatar,
                    is_admin=user.is_admin
                    )

    @classmethod
    def verify_password(cls, plain_password, hashed_password):
        return cls.pwd_context.verify(plain_password, hashed_password)

    @classmethod
    def get_password_hash(cls, password):
        return cls.pwd_context.hash(password)


class Hobby(Base):
    __tablename__ = "hobbies"
    id = Column(String, primary_key=True, index=True, default=str(uuid.uuid4()))
    name = Column(String, unique=True, index=True)
    comment = Column(String)


class UserHobby(Base):
    __tablename__ = "user_hobby"
    user_id = Column(String, ForeignKey("users.id"), primary_key=True)
    hobby_id = Column(String, ForeignKey("hobbies.id"), primary_key=True)


class Preference(Base):
    __tablename__ = "preferences"
    id = Column(String, primary_key=True, index=True, default=str(uuid.uuid4()))
    name = Column(String, unique=True, index=True)
    comment = Column(String)
