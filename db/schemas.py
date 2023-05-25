import uuid
from datetime import datetime
from pydantic import EmailStr, Field
from pydantic import BaseModel
from api.models.category import Category
from api.models.hobbie import Hobbie
from api.models.preference import Preference


class UserBase(BaseModel):
    username: str
    email: EmailStr
    preference: Preference
    preference_afinity: list[Preference]
    bio: str
    avatar: str
    list_images: list[str]
    minimal_score: str
    local: str
    list_hobbies: list[Hobbie]
    category: list[Category]
    birth: datetime = Field(default_factory=datetime.strptime)
    is_admin: bool = Field(default=False)
    id: uuid.UUID = Field(default_factory=uuid.uuid4)


class UserCreate(UserBase):
    password: str


class User(UserBase):
    class Config:
        orm_mode = True
