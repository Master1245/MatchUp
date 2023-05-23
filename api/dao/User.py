import json
from passlib.context import CryptContext
from api.models.category import Category
from api.models.hobbie import Hobbie
from api.models.preference import Preference
from api.models.score import Score
from db.models import User
from db.schemas import UserCreate


class UserDao:

    @classmethod
    def to_dict_api(cls, user: User) -> User:
        preference = Preference(name=user.preference) if user.preference else None
        preference_afinity = [Preference(name=pref) for pref in
                              json.loads(user.preference_afinity)] if user.preference_afinity else []
        list_hobbies = [Hobbie(name=hobbie) for hobbie in json.loads(user.list_hobbies)] if user.list_hobbies else []
        category = [Category(**cat) for cat in json.loads(user.category)] if user.category else []

        return User(id=user.id,
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
                    hashed_password=user.hashed_password,
                    )

    @classmethod
    def format_to_db(cls, user: UserCreate):
        preference = user.preference.name if user.preference else None
        preference_afinity = [pref.name for pref in user.preference_afinity] if user.preference_afinity else []
        list_hobbies = [hobbie.name for hobbie in user.list_hobbies] if user.list_hobbies else []
        category = [cat.to_dict() for cat in user.category] if user.category else []

        return User(
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
        )

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @staticmethod
    def verify_password(plain_password, hashed_password):
        return UserDao.pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password):
        return UserDao.pwd_context.hash(password)
