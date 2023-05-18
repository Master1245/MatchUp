from pydantic.dataclasses import dataclass

from api.models.group_category import GroupCategory


@dataclass
class Category:
    name: str
    color: str
    group: GroupCategory

    def to_dict(self):
        return {
            "name": self.name,
            "color": self.color,
            "group": self.group.to_dict()  # Assuming GroupCategory also has a to_dict() method
        }
