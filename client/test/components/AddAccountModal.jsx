// Add Account Modal Component
function AddAccountModal({ isOpen, onClose, formData, onChange, onSubmit }) {
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
