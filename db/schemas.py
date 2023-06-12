import uuid
from pydantic import EmailStr, Field
from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    email: EmailStr
    id: uuid.UUID = Field(default_factory=uuid.uuid4)


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    password: str


class User(UserBase):
    class Config:
        orm_mode = True
