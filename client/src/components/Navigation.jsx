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
