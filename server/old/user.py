from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    user_id: int
    first_name: str
    last_name: str
    email: str
    birthday: datetime
    registration_date: str
    is_active: bool