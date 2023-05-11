from pydantic.dataclasses import dataclass


@dataclass
class Category:
    name: str
    color: str
    group: GroupCategory
