// Account Card Component
function AccountCard({ account, onDelete }) {
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
