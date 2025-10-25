// Main App Component
function App() {
    const [currentPage, setCurrentPage] = React.useState('accounts');
    const [accounts, setAccounts] = React.useState([]);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '', debtAmount: '', minimumPayment: '', timeOver: '', interestRate: ''
    });
    const [creditScore, setCreditScore] = React.useState(null);
    const [creditFormData, setCreditFormData] = React.useState({
        annualIncome: '', creditUtilization: '', creditHistory: '0',
        paymentHistory: '3', hardInquiries: ''
    });

    // Form handlers
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreditFormChange = (e) => {
        const { name, value } = e.target;
        setCreditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAccount = (e) => {
        e.preventDefault();
        const newAccount = {
            id: Date.now(),
            name: formData.name,
            debtAmount: parseFloat(formData.debtAmount),
            minimumPayment: parseFloat(formData.minimumPayment),
            timeOver: parseInt(formData.timeOver),
            interestRate: parseFloat(formData.interestRate)
        };
        setAccounts(prev => [...prev, newAccount]);
        setFormData({ name: '', debtAmount: '', minimumPayment: '', timeOver: '', interestRate: '' });
        setShowAddModal(false);
    };

    const handleDeleteAccount = (id) => {
        setAccounts(prev => prev.filter(account => account.id !== id));
    };

    const handlePredictScore = (e) => {
        e.preventDefault();
        const score = calculateCreditScore(creditFormData);
        setCreditScore(score);
    };

    // Calculations
    const totalDebt = React.useMemo(() => {
        return accounts.reduce((acc, account) => acc + account.debtAmount, 0);
    }, [accounts]);

    const paymentSchedule = React.useMemo(() => {
        return generatePaymentSchedule(accounts);
    }, [accounts]);

    // Render page content
    let pageContent;
    if (currentPage === 'accounts') {
        pageContent = (
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Your Debt Accounts</h2>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            <Icons.Plus className="h-5 w-5 mr-2" />
                            Add Account
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {accounts.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                <Icons.Wallet className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                                <p className="text-lg">No accounts yet. Add your first debt account to get started.</p>
                            </div>
                        ) : (
                            accounts.map(account => (
                                <AccountCard 
                                    key={account.id} 
                                    account={account} 
                                    onDelete={handleDeleteAccount} 
                                />
                            ))
                        )}
                    </div>
                </div>
                <PaymentSchedule accounts={accounts} schedule={paymentSchedule} />
            </div>
        );
    } else if (currentPage === 'optimizer') {
        pageContent = (
            <DebtOptimizer 
                accounts={accounts} 
                totalDebt={totalDebt} 
                paymentSchedule={paymentSchedule}
                onNavigate={setCurrentPage}
            />
        );
    } else {
        pageContent = (
            <CreditPredictor 
                creditScore={creditScore}
                formData={creditFormData}
                onChange={handleCreditFormChange}
                onSubmit={handlePredictScore}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header totalDebt={totalDebt} />
            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {pageContent}
            </main>
            <AddAccountModal 
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                formData={formData}
                onChange={handleFormChange}
                onSubmit={handleAddAccount}
            />
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-gray-500 text-sm">
                        © 2025 FinOpt. All rights reserved. This is a demo application for educational purposes.
                    </p>
                </div>
            </footer>
        </div>
    );
}

// Wait for libraries and render
function waitForLibraries(callback) {
    const checkInterval = setInterval(() => {
        if (typeof React !== 'undefined' && 
            typeof ReactDOM !== 'undefined' && 
            typeof Icons !== 'undefined') {
            clearInterval(checkInterval);
            setTimeout(callback, 500);
        }
    }, 100);
}

waitForLibraries(() => {
    try {
        console.log('Libraries loaded, starting app...');
        ReactDOM.render(<App />, document.getElementById('root'));
    } catch (error) {
        console.error('Error starting app:', error);
        document.getElementById('root').innerHTML = 
            '<div style="padding: 50px; text-align: center; font-family: Arial;">' +
            '<h1 style="color: red;">Error Loading App</h1>' +
            '<p>' + error.message + '</p>' +
            '<p style="color: #666;">Check the browser console (F12) for more details.</p>' +
            '</div>';
    }
});
