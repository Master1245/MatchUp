from datetime import datetime

from pydantic.dataclasses import dataclass


@dataclass
class Score:
    score_total: int
    next_period: datetime
    user_id: str
    user_connection_id: str
    list_connexions: list

    def to_dict(self):
        return {
            "score_total": self.score_total,
            "next_period": self.next_period.strftime("%Y-%m-%d %H:%M:%S"),
            "user_id": self.user_id,
            "user_connection_id": self.user_connection_id,
            "list_connexions": self.list_connexions
        }
