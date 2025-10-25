#!/bin/bash

# This script updates all component files to use ES6 exports

cd "$(dirname "$0")/src"

echo "🔧 Updating component files for Vite..."

# Update Header.jsx
echo "📝 Fixing Header.jsx..."
cat > components/Header.jsx << 'EOF'
import Icons from './Icons';
import { formatter } from '../utils/helpers';

export default function Header({ totalDebt }) {
    return (
        <header className="bg-white shadow-sm border-b-2 border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-3xl font-bold text-indigo-600">FinOpt</h1>
                    <div className="flex items-center space-x-2">
                        <Icons.Wallet className="h-6 w-6 text-indigo-600" />
                        <span className="text-lg font-semibold text-gray-700">
                            Total Debt: {formatter.format(totalDebt)}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
EOF

# Update Navigation.jsx  
echo "📝 Fixing Navigation.jsx..."
cat > components/Navigation.jsx << 'EOF'
export default function Navigation({ currentPage, setCurrentPage }) {
    const navItems = [
        { id: 'accounts', label: 'Accounts' },
        { id: 'optimizer', label: 'Debt Optimizer' },
        { id: 'predictor', label: 'Credit Predictor' }
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            className={`py-4 px-6 font-medium border-b-4 transition-colors ${
                                currentPage === item.id
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
EOF

# Update AccountCard.jsx
echo "📝 Fixing AccountCard.jsx..."
cat > components/AccountCard.jsx << 'EOF'
import Icons from './Icons';
import { formatter } from '../utils/helpers';

export default function AccountCard({ account, onDelete }) {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{account.name}</h3>
                <button
                    onClick={() => onDelete(account.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                >
                    <Icons.Trash2 className="h-5 w-5" />
                </button>
            </div>
            <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                    <Icons.DollarSign className="h-4 w-4 mr-2 text-indigo-600" />
                    <span className="text-2xl font-bold">{formatter.format(account.debtAmount)}</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                        <span>Min. Payment:</span>
                        <span className="font-medium">{formatter.format(account.minimumPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-medium">{account.interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Time Over:</span>
                        <span className="font-medium">{account.timeOver} months</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
EOF

# Update AddAccountModal.jsx
echo "📝 Fixing AddAccountModal.jsx..."
cat > components/AddAccountModal.jsx << 'EOF'
import Icons from './Icons';

export default function AddAccountModal({ isOpen, onClose, formData, onChange, onSubmit }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Add Debt Account</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <Icons.Plus className="h-6 w-6 transform rotate-45" />
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name of the Debt
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g., Credit Card, Student Loan"
                            value={formData.name}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="debtAmount" className="block text-sm font-medium text-gray-700 mb-1">
                            Debt Amount ($)
                        </label>
                        <input
                            type="number"
                            id="debtAmount"
                            name="debtAmount"
                            placeholder="5000"
                            step="0.01"
                            min="0"
                            value={formData.debtAmount}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="minimumPayment" className="block text-sm font-medium text-gray-700 mb-1">
                            Minimum Payment ($)
                        </label>
                        <input
                            type="number"
                            id="minimumPayment"
                            name="minimumPayment"
                            placeholder="150"
                            step="0.01"
                            min="0"
                            value={formData.minimumPayment}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="timeOver" className="block text-sm font-medium text-gray-700 mb-1">
                            Time Debt is Over (months)
                        </label>
                        <input
                            type="number"
                            id="timeOver"
                            name="timeOver"
                            placeholder="36"
                            min="1"
                            value={formData.timeOver}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                            Interest Rate (%)
                        </label>
                        <input
                            type="number"
                            id="interestRate"
                            name="interestRate"
                            placeholder="18.5"
                            step="0.01"
                            min="0"
                            value={formData.interestRate}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            Add Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
EOF

# Update PaymentSchedule.jsx
echo "📝 Fixing PaymentSchedule.jsx..."
cat > components/PaymentSchedule.jsx << 'EOF'
import { formatter } from '../utils/helpers';

export default function PaymentSchedule({ accounts, schedule }) {
    if (accounts.length === 0) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Payment Schedule (Next 12 Months)
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Month
                            </th>
                            {accounts.map(account => (
                                <th
                                    key={account.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div>{account.name}</div>
                                    <div className="text-xs text-gray-400 font-normal">
                                        Payment / Balance
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {schedule.map(monthData => (
                            <tr key={monthData.month} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Month {monthData.month}
                                </td>
                                {accounts.map(account => (
                                    <td
                                        key={account.id}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                    >
                                        {monthData.payments[account.id] ? (
                                            <div>
                                                <div className="font-semibold text-green-600">
                                                    {formatter.format(monthData.payments[account.id].payment)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Bal: {formatter.format(monthData.payments[account.id].balance)}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
                * Payment schedule uses the Avalanche method (highest interest rate first) with 
                minimum payments + $50 extra toward the priority debt.
            </p>
        </div>
    );
}
EOF

# Update helpers.js to export functions
echo "📝 Fixing helpers.js..."
cat > utils/helpers.js << 'EOF'
// Utility functions and helpers

// Currency formatter
export const formatter = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
});

// Credit score color helper
export function getCreditScoreColor(score) {
    if (score === null) return 'text-gray-400';
    if (score >= 800) return 'text-green-700';
    if (score >= 740) return 'text-green-600';
    if (score >= 670) return 'text-yellow-600';
    if (score >= 580) return 'text-orange-600';
    return 'text-red-600';
}

// Credit score text helper
export function getCreditScoreText(score) {
    if (score === null) return 'Not calculated';
    if (score >= 800) return 'Excellent';
    if (score >= 740) return 'Very Good';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
}

// Generate payment schedule using Avalanche method
export function generatePaymentSchedule(accounts) {
    if (accounts.length === 0) return [];
    
    const sortedAccounts = [...accounts].sort((a, b) => b.interestRate - a.interestRate);
    const schedule = [];
    const accountsStatus = sortedAccounts.map(acc => ({
        ...acc, 
        remainingBalance: acc.debtAmount
    }));

    let month = 1;
    const maxMonths = 60;

    while (month <= maxMonths && accountsStatus.some(acc => acc.remainingBalance > 0)) {
        const monthSchedule = { month, payments: {} };

        accountsStatus.forEach((acc, index) => {
            if (acc.remainingBalance > 0) {
                const monthlyInterest = (acc.interestRate / 100 / 12) * acc.remainingBalance;
                let payment = acc.minimumPayment;
                
                const isFirstWithBalance = accountsStatus.slice(0, index).every(a => a.remainingBalance <= 0);
                if (isFirstWithBalance) {
                    payment = Math.min(acc.remainingBalance + monthlyInterest, payment + 50);
                }
                
                const principalPayment = payment - monthlyInterest;
                acc.remainingBalance = Math.max(0, acc.remainingBalance - principalPayment);
                monthSchedule.payments[acc.id] = { 
                    payment, 
                    balance: acc.remainingBalance 
                };
            }
        });

        schedule.push(monthSchedule);
        month++;
    }
    
    return schedule.slice(0, 12);
}

// Calculate credit score
export function calculateCreditScore(formData) {
    let baseScore = 300;
    const income = parseFloat(formData.annualIncome);
    const utilization = parseFloat(formData.creditUtilization);
    const history = parseInt(formData.creditHistory);
    const paymentHistory = parseInt(formData.paymentHistory);
    const inquiries = parseInt(formData.hardInquiries);

    // Payment history (35% weight)
    baseScore += paymentHistory * 65;
    
    // Credit utilization (30% weight)
    if (utilization < 10) baseScore += 165;
    else if (utilization < 30) baseScore += 135;
    else if (utilization < 50) baseScore += 100;
    else if (utilization < 70) baseScore += 50;
    
    // Length of credit history (15% weight)
    baseScore += history * 30;
    
    // Hard inquiries (10% weight)
    if (inquiries === 0) baseScore += 55;
    else if (inquiries <= 2) baseScore += 30;
    else if (inquiries <= 5) baseScore += 10;
    
    // Income factor (10% weight)
    if (income > 75000) baseScore += 45;
    else if (income > 40000) baseScore += 25;

    return Math.min(baseScore, 850);
}
EOF

echo "✅ All files updated successfully!"
echo ""
echo "🚀 Now run:"
echo "   cd client/finopt-app"
echo "   npm run dev"
