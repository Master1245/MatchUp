import json
import uuid
from passlib.context import CryptContext
from sqlalchemy import Column, String, DateTime, JSON, Boolean
from api.models.category import Category
from api.models.hobbie import Hobbie
from api.models.preference import Preference
from .database import Base
from .schemas import UserCreate

birth = Column(DateTime)
preference = Column(String)
preference_afinity = Column(JSON)
bio = Column(String)
avatar = Column(String)
list_images = Column(String)
minimal_score = Column(String)
local = Column(String)
list_hobbies = Column(String)
category = Column(JSON)


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True, default=str(uuid.uuid4()))
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
