from pydantic.dataclasses import dataclass

from api.models.group_category import GroupCategory


@dataclass
class Category:
    name: str
    color: str
    group: GroupCategory
