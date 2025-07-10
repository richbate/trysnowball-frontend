import React from 'react';

// Generate realistic random debt data
const generateRandomDebts = () => {
  const debtTypes = [
    { name: 'Barclaycard', minRate: 18, maxRate: 29, minLimit: 1500, maxLimit: 5000 },
    { name: 'Halifax Credit Card', minRate: 16, maxRate: 25, minLimit: 2000, maxLimit: 8000 },
    { name: 'MBNA Card', minRate: 19, maxRate: 27, minLimit: 3000, maxLimit: 12000 },
    { name: 'Virgin Money', minRate: 17, maxRate: 24, minLimit: 2500, maxLimit: 6000 },
    { name: 'Tesco Clubcard', minRate: 22, maxRate: 35, minLimit: 1000, maxLimit: 3500 },
    { name: 'Personal Loan', minRate: 6, maxRate: 15, minLimit: 5000, maxLimit: 20000 },
    { name: 'Car Finance', minRate: 3, maxRate: 12, minLimit: 8000, maxLimit: 30000 },
    { name: 'Overdraft', minRate: 25, maxRate: 40, minLimit: 500, maxLimit: 2500 },
    { name: 'PayPal Credit', minRate: 0, maxRate: 23, minLimit: 1000, maxLimit: 4000 },
    { name: 'Store Card', minRate: 28, maxRate: 39, minLimit: 500, maxLimit: 2000 }
  ];

  // Randomly select 4-7 debts
  const numDebts = Math.floor(Math.random() * 4) + 4;
  const selectedTypes = [...debtTypes].sort(() => 0.5 - Math.random()).slice(0, numDebts);
  
  return selectedTypes.map((type, index) => {
    const limit = Math.floor(Math.random() * (type.maxLimit - type.minLimit) + type.minLimit);
    const utilizationPercent = Math.random() * 85 + 5; // 5% to 90% utilization
    const balance = Math.floor(limit * (utilizationPercent / 100));
    const rate = Math.floor(Math.random() * (type.maxRate - type.minRate) + type.minRate);
    const minPayment = Math.max(25, Math.floor(balance * (Math.random() * 0.02 + 0.02))); // 2-4% of balance, min £25
    
    // Add some realistic notes
    let notes = '';
    if (rate === 0) notes = '0% promotional rate';
    else if (utilizationPercent > 80) notes = 'High utilization - consider transfer';
    else if (rate > 30) notes = 'High interest rate';
    else if (balance < limit * 0.3) notes = 'Good utilization level';
    
    return {
      name: type.name,
      balance: Math.round(balance),
      rate,
      minPayment: Math.round(minPayment * 100) / 100, // Round to 2 decimal places
      limit,
      notes
    };
  });
};

// Generate random debt data on each page load
const debts = generateRandomDebts();

const formatCurrency = (value) => {
  if (typeof value !== 'number' || isNaN(value)) return '£0';
  return '£' + value.toLocaleString(undefined, { minimumFractionDigits: 0 });
};

const MyDebtsPage = ({ onPageChange }) => {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  // const totalAvailableCredit = debts.reduce((sum, debt) => sum + (debt.limit - debt.balance), 0);
  const averageInterestRate = debts.reduce((sum, debt) => sum + (debt.rate * debt.balance), 0) / totalDebt;

  // Calculate monthly interest cost
  const monthlyInterest = debts.reduce((sum, debt) => {
    return sum + (debt.balance * (debt.rate / 100 / 12));
  }, 0);

  // Calculate annual interest cost if no payments made
  const annualInterestCost = monthlyInterest * 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Debts</h1>
          <p className="text-xl text-gray-600">The current situation - Using dummy data right now</p>
        </div>

        {/* Scary Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-red-600">Total Debt</p>
                <p className="text-2xl font-bold text-red-700">{formatCurrency(totalDebt)}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-orange-600">Monthly Interest</p>
                <p className="text-2xl font-bold text-orange-700">{formatCurrency(monthlyInterest)}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-600">Min Payments</p>
                <p className="text-2xl font-bold text-yellow-700">{formatCurrency(totalMinPayments)}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">Avg Interest Rate</p>
                <p className="text-2xl font-bold text-purple-700">{averageInterestRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debt Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Debt Breakdown</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest Rate
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min Payment
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit Limit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {debts.sort((a, b) => b.balance - a.balance).map((debt, index) => {
                  const utilizationPercent = (debt.balance / debt.limit) * 100;
                  const available = debt.limit - debt.balance;
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{debt.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-bold text-red-600">{formatCurrency(debt.balance)}</div>
                        <div className={`text-xs font-medium ${
                          utilizationPercent < 75 ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {utilizationPercent.toFixed(0)}% used
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          debt.rate === 0 ? 'bg-green-100 text-green-800' : 
                          debt.rate < 15 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {debt.rate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        {formatCurrency(debt.minPayment)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {formatCurrency(debt.limit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-green-600">{formatCurrency(available)}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {debt.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reality Check Section */}
        <div className="bg-red-100 border border-red-400 rounded-lg p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">
                Reality Check
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-2">
                  <li>If you make NO payments, your debt will grow to <strong>{formatCurrency(totalDebt + annualInterestCost)}</strong> in just one year</li>
                  <li>You're currently paying <strong>{formatCurrency(monthlyInterest)}</strong> every month just in interest</li>
                  <li>That's <strong>{formatCurrency(annualInterestCost)}</strong> per year going to the banks, not reducing your debt</li>
                  <li>At minimum payments only, you'll be in debt for <strong>many years</strong> and pay thousands more in interest</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">But there's hope!</h2>
          <p className="text-lg mb-6">
            The debt snowball method could help you become debt-free faster and save thousands in interest.
          </p>
          <button 
            onClick={() => onPageChange && onPageChange('what-if')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            See Your Way Out →
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => onPageChange && onPageChange('home')}
            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyDebtsPage;