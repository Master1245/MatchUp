import json
import uuid
from passlib.context import CryptContext
from sqlalchemy import Column, String, DateTime, JSON, Boolean
from api.models.category import Category
from api.models.hobbie import Hobbie
from api.models.preference import Preference
from .database import Base
from .schemas import UserCreate




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
    is_admin = Column(Boolean, default=False)

    @classmethod
    def to_dict_api(cls, user):
        preference = Preference(name=user.preference) if user.preference else None
        preference_afinity = [Preference(name=pref) for pref in
                              json.loads(user.preference_afinity)] if user.preference_afinity else []
        list_hobbies = [Hobbie(name=hobbie) for hobbie in json.loads(user.list_hobbies)] if user.list_hobbies else []
        category = [Category(**cat) for cat in json.loads(user.category)] if user.category else []
        return User(id=str(user.id),
                    username=user.username,
                    birth=user.birth,
                    email=user.email,
                    preference=preference,
                    preference_afinity=preference_afinity,
                    bio=user.bio,
                    avatar=user.avatar,
                    list_images=user.list_images,
                    minimal_score=user.minimal_score,
                    local=user.local,
                    list_hobbies=list_hobbies,
                    category=category,
                    hashed_password=user.hashed_password
                    )

    @classmethod
    def format_to_db(cls, user: UserCreate):
        preference = user.preference.name if user.preference else None
        preference_afinity = [pref.name for pref in user.preference_afinity] if user.preference_afinity else []
        list_hobbies = [hobbie.name for hobbie in user.list_hobbies] if user.list_hobbies else []
        category = [cat.to_dict() for cat in user.category] if user.category else []
        return User(
            id=str(user.id),
            username=user.username,
            birth=user.birth,
            email=user.email,
            preference=preference,
            preference_afinity=json.dumps(preference_afinity),
            bio=user.bio,
            avatar=user.avatar,
            list_images=json.dumps(user.list_images),
            minimal_score=user.minimal_score,
            local=user.local,
            list_hobbies=json.dumps(list_hobbies),
            category=json.dumps(category),
            hashed_password=user.password,
            is_admin=user.is_admin
        )

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @classmethod
    def verify_password(cls, plain_password, hashed_password):
        return cls.pwd_context.verify(plain_password, hashed_password)

    @classmethod
    def get_password_hash(cls, password):
        return cls.pwd_context.hash(password)
