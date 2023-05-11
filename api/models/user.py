import dataclasses
import uuid
from datetime import datetime
from uuid import UUID
from pydantic import EmailStr
from pydantic.dataclasses import dataclass
from api.models.preference import Preference
from api.models.category import Category
from api.models.hobbie import Hobbie
from api.models.score import Score


@dataclass
class User:
    username: str
    birth: datetime
    email: EmailStr
    preference: Preference
    preference_afinity: list[Preference]
    bio: str
    avatar: str
    list_images: list[str]
    minimal_score: Score
    local: str
    list_hobbie: list[Hobbie]
    category: list[Category]
    id: UUID = dataclasses.field(default=uuid.uuid4())


#https://docs.pydantic.dev/latest/usage/dataclasses/

#https://fastapi.tiangolo.com/pl/tutorial/extra-models/