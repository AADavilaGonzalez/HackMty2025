from dataclasses import dataclass
from enum import Enum
from datetime import datetime

class PaymentFrecuency(Enum):
    MONTHLY = 12
    BIWEEKLY = 24
    WEEKLY = 52

@dataclass
class Debt:
    debt_id: int
    user_id: int
    creditor_name: str
    original_amount: float
    outstanding_balance: float
    interest_rate: float
    periodic_payment: float
    payment_frecuency: PaymentFrecuency    
    term_months_original: int
    is_active: bool
    interest_payment_current: float
    capital_payment_current: float
    days_past_due: int
    interest_rate_default: float
    last_payment_date: datetime
