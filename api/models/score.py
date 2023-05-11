from datetime import datetime

from pydantic.dataclasses import dataclass


@dataclass
class Score:
    score_total: int
    next_period: datetime
    list_connexions: list
