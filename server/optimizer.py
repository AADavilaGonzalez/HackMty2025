from debt import Debt
from user import PaymentFrecuency
from pulp import LpMaximize, LpProblem, LpVariable, value
from typing import List

def calculate_current_installment(debt: Debt) -> None:
    """
    Calculates the interest and principal payment for the next installment.
    Assumes periodic interest compounding.
    """
    
    if not debt.is_active:
        return

    periodic_rate = (debt.interest_rate / 100) / debt.payment_frequency.value
    

    current_interest = debt.outstanding_balance * periodic_rate
    
    minimum_principal_payment = debt.periodic_payment - current_interest

    debt.interest_payment_current = current_interest
    
    debt.capital_payment_current = max(0.0, minimum_principal_payment)


#Optimizacion lineal

def optimize_payment_plan(debts: List[Debt], extra_budget: float) -> dict:
    """
    Solves the Linear Programming model to find the optimal allocation 
    of the extra budget to minimize the overall debt cost (Advanced Avalanche Method).
    
    :param debts: List of active Debt objects.
    :param extra_budget: Additional money available for principal payments.
    :return: Dictionary with the optimal extra payment allocation by debt_id.
    """
    
    # 1. Model Initialization
    # Creates the optimization problem container. LpMaximize tells the solver
    # to maximize the objective function.
    model = LpProblem("Debt_Payment_Optimization", LpMaximize)
    
    # 2. Decision Variables (xi)
    # Defines the variable for the extra principal payment for each active debt.
    # lowBound=0 enforces the constraint that extra payments must be non-negative.
    extra_payments = {
        d.debt_id: LpVariable(f"Extra_Payment_{d.debt_id}", lowBound=0)
        for d in debts if d.is_active
    }
    
    # 3. Objective Function (Maximize the Impact on High-Interest Debts)
    # The solver will try to maximize this sum. By multiplying the extra payment
    # by the interest rate, we ensure the money goes to the highest-rate debt first.
    objective_function = []
    for debt in debts:
        if debt.is_active:
            # Coefficient = Annual Interest Rate (the cost we want to attack)
            objective_function += [debt.interest_rate * extra_payments[debt.debt_id]]

    model += sum(objective_function), "Maximize_High_Rate_Impact"

    model += sum(extra_payments.values()) <= extra_budget, "Total_Extra_Budget_Constraint"
    

    model.solve()

    results = {}
    for debt_id, variable in extra_payments.items():
        results[debt_id] = value(variable)
        
    return results