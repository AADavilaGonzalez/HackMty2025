import { formatter } from '../utils/helpers';
import { useState, useEffect } from 'react';
import Icons from './Icons';

export default function PaymentSchedule({ accounts, schedule }) {
    const [optimizedPlan, setOptimizedPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [monthlyBudget, setMonthlyBudget] = useState('1500');
    const [monthlyIncome, setMonthlyIncome] = useState('3000');

    // Fetch optimized plan from Python backend
    const fetchOptimizedPlan = async () => {
        if (accounts.length === 0) return;

        setIsLoading(true);
        setError(null);

        try {
            const apiData = {
                user: {
                    balance: parseFloat(monthlyBudget),
                    averageIncome: parseFloat(monthlyIncome)
                },
                debts: accounts.map(account => ({
                    name: account.name,
                    balance: account.debtAmount,
                    interestRate: account.interestRate / 100, // Convert percentage to decimal
                    minimumPayment: account.minimumPayment
                }))
            };

            const response = await fetch('http://localhost:5001/api/optimize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiData)
            });

            if (!response.ok) throw new Error('Failed to fetch optimized plan');

            const plan = await response.json();
            setOptimizedPlan(plan);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching optimized plan:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (accounts.length === 0) return null;

    return (
        <div className="space-y-6">
            {/* Budget Input Card */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Optimization Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Monthly Budget for Debt Payment
                        </label>
                        <input
                            type="number"
                            value={monthlyBudget}
                            onChange={(e) => setMonthlyBudget(e.target.value)}
                            className="w-full px-4 py-2 rounded-md text-gray-900"
                            placeholder="1500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Average Monthly Income
                        </label>
                        <input
                            type="number"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(e.target.value)}
                            className="w-full px-4 py-2 rounded-md text-gray-900"
                            placeholder="3000"
                        />
                    </div>
                </div>
                <button
                    onClick={fetchOptimizedPlan}
                    disabled={isLoading}
                    className="mt-4 w-full md:w-auto px-6 py-2 bg-white text-indigo-600 font-semibold rounded-md hover:bg-indigo-50 transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Optimizing...' : 'Generate Optimized Plan'}
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <span className="ml-4 text-gray-600">Calculating optimal payment plan...</span>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Icons.TrendingUp className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error</h3>
                                <p className="text-sm text-red-700 mt-1">{error}</p>
                                <p className="text-xs text-red-600 mt-2">
                                    Make sure the Python backend is running: <code>python server/main.py</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Optimized Plan Display */}
            {optimizedPlan && !isLoading && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            🎯 Optimized Payment Schedule
                        </h2>
                        <div className="flex items-center space-x-4 text-sm">
                            <div className="bg-green-50 px-4 py-2 rounded-full">
                                <span className="text-green-700 font-semibold">
                                    Total Interest: {formatter.format(optimizedPlan.totalInterestPaid)}
                                </span>
                            </div>
                            <div className="text-gray-600">
                                <Icons.TrendingUp className="inline h-4 w-4 mr-1" />
                                Optimized using Linear Programming
                            </div>
                        </div>
                    </div>

                    {/* Payment Plans for Each Debt */}
                    <div className="space-y-6">
                        {optimizedPlan.paymentPlans.map((plan, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-indigo-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-800 flex items-center">
                                        <Icons.DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
                                        {plan.name}
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Month
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Payment Amount
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Remaining Balance
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {plan.monthlyPayments.map((payment) => (
                                                <tr key={payment.paymentNumber} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        Month {payment.paymentNumber}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                                        {formatter.format(payment.paymentAmount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {formatter.format(payment.remainingBalance)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
                        <div className="flex">
                            <Icons.TrendingUp className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                            <div>
                                <p className="text-sm text-blue-700 font-semibold mb-1">
                                    How this works:
                                </p>
                                <p className="text-xs text-blue-600">
                                    This payment schedule uses Linear Programming optimization (PuLP library) to minimize 
                                    total interest paid. The algorithm considers your monthly budget, minimum payments, 
                                    and interest rates to create the most efficient debt payoff strategy over 24 months.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
