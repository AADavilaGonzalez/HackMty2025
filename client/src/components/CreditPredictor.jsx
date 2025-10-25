import Icons from './Icons';
import { getCreditScoreColor, getCreditScoreText } from '../utils/helpers';

// Credit Predictor Component
export default function CreditPredictor({ creditScore, formData, onChange, onSubmit }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Creditworthiness Predictor</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Score Display */}
                <div className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-lg p-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                        Estimated Credit Score
                    </h3>
                    <div className="text-center">
                        <div className={`text-7xl font-bold mb-2 ${getCreditScoreColor(creditScore)}`}>
                            {creditScore === null ? '---' : creditScore}
                        </div>
                        <div className={`text-2xl font-semibold mb-4 ${getCreditScoreColor(creditScore)}`}>
                            {getCreditScoreText(creditScore)}
                        </div>
                        <p className="text-sm text-gray-500">
                            This is an estimate for educational purposes only.
                        </p>
                    </div>
                    {creditScore !== null && (
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Poor</span>
                                <span className="text-gray-600">Fair</span>
                                <span className="text-gray-600">Good</span>
                                <span className="text-gray-600">Excellent</span>
                            </div>
                            <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-500 via-green-400 to-green-700 rounded-full" />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>300</span>
                                <span>580</span>
                                <span>670</span>
                                <span>740</span>
                                <span>850</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Financial Profile</h3>
                    
                    <div>
                        <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
                            Annual Income ($)
                        </label>
                        <input
                            type="number"
                            id="annualIncome"
                            name="annualIncome"
                            placeholder="50000"
                            min="0"
                            value={formData.annualIncome}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="creditUtilization" className="block text-sm font-medium text-gray-700 mb-1">
                            Credit Utilization (%)
                        </label>
                        <input
                            type="number"
                            id="creditUtilization"
                            name="creditUtilization"
                            placeholder="30"
                            min="0"
                            max="100"
                            value={formData.creditUtilization}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="creditHistory" className="block text-sm font-medium text-gray-700 mb-1">
                            Length of Credit History
                        </label>
                        <select
                            id="creditHistory"
                            name="creditHistory"
                            value={formData.creditHistory}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            required
                        >
                            <option value="0">Less than 2 years</option>
                            <option value="1">2-5 years</option>
                            <option value="2">5-10 years</option>
                            <option value="3">10+ years</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="paymentHistory" className="block text-sm font-medium text-gray-700 mb-1">
                            Payment History
                        </label>
                        <select
                            id="paymentHistory"
                            name="paymentHistory"
                            value={formData.paymentHistory}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            required
                        >
                            <option value="3">Excellent (No late payments)</option>
                            <option value="2">Good (1-2 late payments)</option>
                            <option value="1">Fair (Several late payments)</option>
                            <option value="0">Poor (Defaults or collections)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="hardInquiries" className="block text-sm font-medium text-gray-700 mb-1">
                            Hard Inquiries (last 12 months)
                        </label>
                        <input
                            type="number"
                            id="hardInquiries"
                            name="hardInquiries"
                            placeholder="2"
                            min="0"
                            value={formData.hardInquiries}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        <Icons.TrendingUp className="h-5 w-5 mr-2" />
                        Calculate Credit Score
                    </button>
                </form>
            </div>
        </div>
    );
}
