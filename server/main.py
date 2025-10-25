from flask import Flask, jsonify, request

from optimization import optimize_debt

app = Flask("app")

@app.route("/", methods=["POST"])
def get_payment_plan():
    user_data = request.get_json()
    payment_plan = optimize_debt(user_data)
    return jsonify(payment_plan), 201

if __name__ == "__main__":
    app.run()
