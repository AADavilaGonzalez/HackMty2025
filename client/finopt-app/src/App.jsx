import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import AccountCard from './components/AccountCard';
import AddAccountModal from './components/AddAccountModal';
import PaymentSchedule from './components/PaymentSchedule';
import DebtOptimizer from './components/DebtOptimizer';
import CreditPredictor from './components/CreditPredictor';
import { generatePaymentSchedule, calculateCreditScore } from './utils/helpers';
import Icons from './components/Icons';

function App() {
    const [currentPage, setCurrentPage] = useState('accounts');
    const [accounts, setAccounts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '', debtAmount: '', minimumPayment: '', timeOver: '', interestRate: ''
    });
    const [creditScore, setCreditScore] = useState(null);
    const [creditFormData, setCreditFormData] = useState({
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
    const totalDebt = useMemo(() => {
        return accounts.reduce((acc, account) => acc + account.debtAmount, 0);
    }, [accounts]);

    const paymentSchedule = useMemo(() => {
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

export default App;
