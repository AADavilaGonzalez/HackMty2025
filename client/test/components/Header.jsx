// Header Component
function Header({ totalDebt }) {
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
