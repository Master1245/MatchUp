from datetime import datetime
from uuid import UUID

from pydantic.dataclasses import dataclass

from api.models.user import User


@dataclass
class Chan:
    id: UUID
    user1: User
    User2: User
    match_date: datetime
