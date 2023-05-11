from pydantic.dataclasses import dataclass
from api.models.connexion import Connexion
from api.models.score import Score


@dataclass
class Opinion:
    opnion: str
    score: Score
    connexion: Connexion
