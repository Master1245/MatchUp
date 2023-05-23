import uuid
from api.models.user import UserBase


class UserCreate(UserBase):
    password: str


class User(UserBase):

    class Config:
        orm_mode = True
