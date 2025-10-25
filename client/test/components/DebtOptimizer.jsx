// Debt Optimizer Component
function DebtOptimizer({ accounts, totalDebt, paymentSchedule, onNavigate }) {
    if (accounts.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Debt Payment Optimizer</h2>
                <div className="text-center py-12 text-gray-500">
                    <Icons.TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-4">Add debt accounts to see optimization recommendations.</p>
                    <button
                        onClick={() => onNavigate('accounts')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Go to Accounts
                    </button>
                </div>
            </div>
        );
    }

    const avgInterest = accounts.reduce((sum, acc) => sum + acc.interestRate, 0) / accounts.length;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Debt Payment Optimizer</h2>
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <Icons.DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                            <h3 className="text-sm font-medium text-blue-900">Total Debt</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-700">{formatter.format(totalDebt)}</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <Icons.Calendar className="h-5 w-5 text-green-600 mr-2" />
                            <h3 className="text-sm font-medium text-green-900">Est. Payoff</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-700">{paymentSchedule.length} months</p>
                    </div>
                    <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <Icons.Percent className="h-5 w-5 text-orange-600 mr-2" />
                            <h3 className="text-sm font-medium text-orange-900">Avg. Interest</h3>
                        </div>
                        <p className="text-2xl font-bold text-orange-700">{avgInterest.toFixed(2)}%</p>
                    </div>
                </div>

                {/* Strategy Recommendation */}
                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                        Recommended Strategy: Avalanche Method
                    </h3>
                    <p className="text-gray-700">
                        We recommend paying off debts with the highest interest rates first while making 
                        minimum payments on others. This strategy saves you the most money on interest 
                        over time. Check the Accounts page for your detailed payment schedule.
                    </p>
                </div>

                {/* Priority List */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Priority Order (Highest Interest First)
                    </h3>
                    <div className="space-y-3">
                        {[...accounts].sort((a, b) => b.interestRate - a.interestRate).map((account, index) => (
                            <div
                                key={account.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold mr-4">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{account.name}</h4>
                                        <p className="text-sm text-gray-600">
                                            {formatter.format(account.debtAmount)} @ {account.interestRate}% APR
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Min. Payment</p>
                                    <p className="font-semibold text-gray-800">
                                        {formatter.format(account.minimumPayment)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
