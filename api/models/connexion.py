from pydantic.dataclasses import dataclass


@dataclass
class Connexion:
    type: str
    affinity_points: int
    unlock_point: int
