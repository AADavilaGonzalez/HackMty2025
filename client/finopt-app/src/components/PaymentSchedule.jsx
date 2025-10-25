import { formatter } from '../utils/helpers';

export default function PaymentSchedule({ accounts, schedule }) {
    if (accounts.length === 0) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Payment Schedule (Next 12 Months)
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Month
                            </th>
                            {accounts.map(account => (
                                <th
                                    key={account.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div>{account.name}</div>
                                    <div className="text-xs text-gray-400 font-normal">
                                        Payment / Balance
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {schedule.map(monthData => (
                            <tr key={monthData.month} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Month {monthData.month}
                                </td>
                                {accounts.map(account => (
                                    <td
                                        key={account.id}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                    >
                                        {monthData.payments[account.id] ? (
                                            <div>
                                                <div className="font-semibold text-green-600">
                                                    {formatter.format(monthData.payments[account.id].payment)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Bal: {formatter.format(monthData.payments[account.id].balance)}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
                * Payment schedule uses the Avalanche method (highest interest rate first) with 
                minimum payments + $50 extra toward the priority debt.
            </p>
        </div>
    );
}
