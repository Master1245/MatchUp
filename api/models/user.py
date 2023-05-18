import uuid
from datetime import datetime
from pydantic import EmailStr, BaseModel, Field
from api.models.preference import Preference
from api.models.category import Category
from api.models.hobbie import Hobbie
from api.models.score import Score


class UserBase(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4)
    username: str
    birth: datetime = Field(default_factory=datetime.strptime)
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

