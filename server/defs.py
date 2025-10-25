from dataclasses import dataclass

@dataclass
class User:
    balance: float
    avg_income: float

@dataclass
class Debt:
    name: str
    balance: float
    interest_rate: float
    minimum_payment: float
