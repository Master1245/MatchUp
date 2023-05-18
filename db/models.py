import uuid
from sqlalchemy import Column, String, DateTime, JSON
from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True, default=str(uuid.uuid4()))
    username = Column(String, unique=True, index=True)
    birth = Column(DateTime)
    email = Column(String, unique=True, index=True)
    preference = Column(String)
    preference_afinity = Column(JSON)
    bio = Column(String)
    avatar = Column(String)
    list_images = Column(String)
    minimal_score = Column(String)
    local = Column(String)
    list_hobbies = Column(String)
    category = Column(JSON)
    hashed_password = Column(String)
