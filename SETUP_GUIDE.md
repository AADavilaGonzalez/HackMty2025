# FinOpt - Debt Optimization Application

A full-stack application that helps optimize debt payment plans using Linear Programming.

## 🎯 Features

- **Debt Account Management**: Add, view, and manage multiple debt accounts
- **Optimized Payment Plans**: Uses Linear Programming (PuLP) to minimize total interest paid
- **Budget Configuration**: Set monthly budget and income for personalized optimization
- **Credit Score Predictor**: Estimate your credit score based on financial factors
- **Debt Optimizer Dashboard**: Visualize debt payoff strategies

## 🏗️ Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Python Flask + PuLP (Linear Programming solver)
- **Optimization**: Uses the CBC solver for Linear Programming

## 🚀 Setup Instructions

### Prerequisites

- Node.js v22+ and npm
- Python 3.8+
- pip (Python package manager)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```bash
   python main.py
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client/finopt-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## 📖 How to Use

1. **Start both servers** (backend and frontend)

2. **Add your debt accounts**:
   - Click "Add Account"
   - Enter debt details (name, amount, minimum payment, interest rate)

3. **Set your budget**:
   - In the "Optimization Settings" card, enter:
     - Monthly budget available for debt payment
     - Average monthly income

4. **Generate optimized plan**:
   - Click "Generate Optimized Plan"
   - The system will calculate the optimal payment strategy using Linear Programming

5. **View results**:
   - See month-by-month payment schedules for each debt
   - Total interest saved is displayed at the top

## 🧮 How the Optimization Works

The application uses **Linear Programming** to minimize total interest paid while respecting:

- Your monthly budget constraint
- Minimum payment requirements for each debt
- Interest rate calculations
- 24-month payment horizon

The PuLP library with CBC solver finds the optimal payment allocation across all debts.

## 🛠️ Technology Stack

### Frontend
- React 19
- Vite 7
- Tailwind CSS 4
- JavaScript/JSX

### Backend
- Python 3
- Flask 3.0
- Flask-CORS 4.0
- PuLP 2.7 (Linear Programming)

## 📁 Project Structure

```
HackMty2025/
├── client/
│   └── finopt-app/          # React frontend
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── utils/       # Helper functions
│       │   └── main.jsx     # Entry point
│       └── package.json
└── server/
    ├── main.py              # Flask API
    ├── optimization.py      # LP optimization logic
    ├── defs.py             # Data classes
    └── requirements.txt     # Python dependencies
```

## 🧪 Testing

Test the backend optimization directly:
```bash
cd server
python test.py
```

This will run a sample optimization with test data and show the results.

## 🤝 Contributing

This is a hackathon project for HackMty 2025.

## 📄 License

Educational/Demo purposes only.
