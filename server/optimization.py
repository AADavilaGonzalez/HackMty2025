import pulp

from defs import User, Debt


def optimize_debt(data):

    MONTHS = 24 #Replace with preditcion

    user = User(
        data["user"]["balance"],
        data["user"]["averageIncome"]
    )
    monthly_budget = user.avg_income

    debts = []
    for debt in data["debts"]:
        debts.append(
            Debt(
                debt["balance"],
                debt["interestRate"],
                debt["minimumPayment"]
            )
        )

    model = pulp.LpProblem("Debt_Optimization", pulp.LpMinimize)

    B = {}  # balance at start of month d
    P = {}  # payment in month t

    for d, debt in enumerate(debts):
        for t in range(MONTHS + 1):
            B[(d, t)] = pulp.LpVariable(f"B_{d}_{t}", lowBound=0)
        for t in range(MONTHS):
            P[(d, t)] = pulp.LpVariable(f"P_{d}_{t}", lowBound=0)

# ===============================
# Constraints
# ===============================

    for d, debt in enumerate(debts):
        i = debt["apr"] / 12.0

        # initial balance
        model += B[(d, 0)] == debt["balance"]

        # balance transition per month
        for t in range(MONTHS):
            model += B[(d, t + 1)] == B[(d, t)] * (1 + i) - P[(d, t)]

            # payment bounds
            model += P[(d, t)] <= B[(d, t)] * (1 + i)
            model += P[(d, t)] >= min(debt["min_payment"], debt["balance"])

# monthly total payment constraint
    for t in range(MONTHS):
        model += sum(P[(d, t)] for d in range(len(debts))) <= monthly_budget

# ===============================
# Objective: minimize total interest
# ===============================

    total_interest = sum(
        B[(d, t)] * (debts[d]["apr"] / 12.0)
        for d in range(len(debts))
        for t in range(MONTHS)
    )
    model += total_interest

# ===============================
# Solve
# ===============================

    model.solve(pulp.PULP_CBC_CMD(msg=False))

    results = {
        "status": model.status,
        "total_interest_paid": pulp.value(total_interest),
        "payment_plan": []
    }

# ===============================
# Results
# ===============================

    for d, debt in enumerate(debts):
        debt_plan = {
            "name": debt.name,
            "monthly_details": []
        }

        for t in range(MONTHS):
            bal = B[(d, t)].value()
            pay = P[(d, t)].value()
            if bal < 1e-2 and pay < 1e-2:
                break
            month_detail = {
                "month": t + 1,
                "payment": round(pay, 2),
                "remaining_balance": round(B[(d, t + 1)].value(), 2)
            }
            debt_plan["monthly_details"].append(month_detail)

        results["payment_plan"].append(debt_plan)
    return results

