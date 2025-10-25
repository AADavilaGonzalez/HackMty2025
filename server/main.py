from flask import Flask, jsonify, request
from flask_cors import CORS

from optimization import optimize_debt

app = Flask("app")
CORS(app)  # Enable CORS for React frontend

@app.route("/api/optimize", methods=["POST"])
def get_payment_plan():
    """Optimize debt payment plan using Linear Programming"""
    try:
        user_data = request.get_json()
        payment_plan = optimize_debt(user_data)
        return jsonify(payment_plan), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Changed to 5001 to avoid macOS AirPlay conflict
