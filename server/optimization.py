import pulp

from .defs import User, Debt


def optimize_debt(data):

    MONTHS = 24 #Replace with preditcion

    user = User(
        data["user"]["balance"],
        data["user"]["averageIncome"]
    )

    debts = [] 
    for debt in data["debts"]:
        debt.append(
            Debt(
                debt["balance"],
                debt["interestRate"],
                debt["minimumPayment"]
            )
        )

    model = pulp.LpProblem("Debt_Optimization", pulp.LpMinimize)

    B = {}  # balance at start of month t
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
    for t in range(months):
        model += B[(d, t + 1)] == B[(d, t)] * (1 + i) - P[(d, t)]

        # payment bounds
        model += P[(d, t)] <= B[(d, t)] * (1 + i)
        model += P[(d, t)] >= min(debt["min_payment"], debt["balance"])

# monthly total payment constraint
for t in range(months):
    model += sum(P[(d, t)] for d in range(len(debts))) <= monthly_budget

# ===============================
# Objective: minimize total interest
# ===============================

total_interest = sum(
    B[(d, t)] * (debts[d]["apr"] / 12.0)
    for d in range(len(debts))
    for t in range(months)
)
model += total_interest

# ===============================
# Solve
# ===============================

model.solve(pulp.PULP_CBC_CMD(msg=False))
print(f"Status: {pulp.LpStatus[model.status]}")

# ===============================
# Results
# ===============================

for d, debt in enumerate(debts):
    print(f"\n{debt['name']}")
    print("-" * len(debt['name']))
    for t in range(months):
        bal = B[(d, t)].value()
        pay = P[(d, t)].value()
        if bal < 1e-2 and pay < 1e-2:
            break
        print(f"Month {t+1:2d}: Pay ${pay:8.2f} | Balance after interest ${B[(d, t+1)].value():,.2f}")

total_interest_value = pulp.value(total_interest)
print(f"\nTotal interest paid (optimized): ${total_interest_value:,.2f}")

