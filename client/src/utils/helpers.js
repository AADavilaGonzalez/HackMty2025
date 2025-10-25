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
