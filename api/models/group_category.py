from pydantic.dataclasses import dataclass


@dataclass
class GroupCategory:
    name: str

    def to_dict(self):
        return {
            "name": self.name
        }
