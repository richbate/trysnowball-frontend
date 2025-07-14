import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const numDebts = Math.floor(Math.random() * 4) + 4;
  const selectedTypes = [...debtTypes].sort(() => 0.5 - Math.random()).slice(0, numDebts);
  
  return selectedTypes.map((type, index) => {
    const limit = Math.floor(Math.random() * (type.maxLimit - type.minLimit) + type.minLimit);
    const utilizationPercent = Math.random() * 85 + 5;
    const balance = Math.floor(limit * (utilizationPercent / 100));
    const rate = Math.floor(Math.random() * (type.maxRate - type.minRate) + type.minRate);
    const minPayment = Math.max(25, Math.floor(balance * (Math.random() * 0.02 + 0.02)));
    
    return {
      id: Date.now() + index,
      name: type.name,
      amount: Math.round(balance),
      interest: rate,
      regularPayment: Math.round(minPayment * 100) / 100,
      limit,
      isDemo: true // Mark as demo data
    };
  });
};

const DebtTracker = () => {
  const navigate = useNavigate();
  const [debts, setDebts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [extraPayment, setExtraPayment] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    interest: 20,
    regularPayment: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDebts = localStorage.getItem('trysnowball-debts');
    const savedExtraPayment = localStorage.getItem('trysnowball-extra-payment');
    
    if (savedDebts) {
      try {
        const parsedDebts = JSON.parse(savedDebts);
        if (parsedDebts.length > 0) {
          setDebts(parsedDebts);
        } else {
          // If saved data is empty, load demo data
          const demoDebts = generateRandomDebts();
          setDebts(demoDebts);
        }
      } catch (error) {
        console.error('Error loading saved debts:', error);
        // If there's an error, load demo data
        const demoDebts = generateRandomDebts();
        setDebts(demoDebts);
      }
    } else {
      // If no saved data, load demo data
      const demoDebts = generateRandomDebts();
      setDebts(demoDebts);
    }
    
    if (savedExtraPayment) {
      setExtraPayment(Number(savedExtraPayment));
    }
  }, []);

  // Save debts to localStorage whenever debts change
  useEffect(() => {
    localStorage.setItem('trysnowball-debts', JSON.stringify(debts));
  }, [debts]);

  // Save extra payment to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trysnowball-extra-payment', extraPayment.toString());
  }, [extraPayment]);

  const handleSubmit = () => {
    if (!formData.name || !formData.amount || !formData.regularPayment) return;

    const newDebt = {
      id: Date.now(),
      name: formData.name,
      amount: parseFloat(formData.amount),
      interest: parseFloat(formData.interest),
      regularPayment: parseFloat(formData.regularPayment),
      isDemo: false
    };

    setDebts([...debts, newDebt]);
    setFormData({ name: '', amount: '', interest: 20, regularPayment: '' });
    setShowAddForm(false);
  };

  const deleteDebt = (id) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  // Clear all data function
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all your debt data? This cannot be undone.')) {
      setDebts([]);
      setExtraPayment(0);
      localStorage.removeItem('trysnowball-debts');
      localStorage.removeItem('trysnowball-extra-payment');
    }
  };

  // Load fresh demo data
  const loadDemoData = () => {
    const demoDebts = generateRandomDebts();
    setDebts(demoDebts);
  };

  // Check if current data is demo data
  const hasOnlyDemoData = debts.length > 0 && debts.every(debt => debt.isDemo);

  // ChatGPT Export Functions
  const categorizeDebtType = (debtName) => {
    const name = debtName.toLowerCase();
    if (name.includes('credit card') || name.includes('cc') || name.includes('visa') || name.includes('mastercard') || name.includes('barclaycard') || name.includes('halifax') || name.includes('mbna') || name.includes('virgin') || name.includes('tesco')) {
      return 'Credit Card';
    } else if (name.includes('car') || name.includes('auto') || name.includes('vehicle')) {
      return 'Auto Loan';
    } else if (name.includes('student') || name.includes('education')) {
      return 'Student Loan';
    } else if (name.includes('mortgage') || name.includes('home') || name.includes('house')) {
      return 'Mortgage';
    } else if (name.includes('personal') || name.includes('loan')) {
      return 'Personal Loan';
    } else if (name.includes('overdraft') || name.includes('od')) {
      return 'Overdraft';
    } else if (name.includes('klarna') || name.includes('clearpay') || name.includes('laybuy') || name.includes('paypal')) {
      return 'Buy Now Pay Later';
    } else {
      return 'Other';
    }
  };

  const calculateDebtFreeDate = () => {
    const today = new Date();
    const futureDate = new Date(today.getFullYear(), today.getMonth() + payoffData.totalMonths, today.getDate());
    return futureDate.toISOString().split('T')[0];
  };

  const downloadForChatGPT = () => {
    if (debts.length === 0) {
      alert('Please add your debts first before downloading.');
      return;
    }

    const chatGPTData = {
      generated_date: new Date().toISOString().split('T')[0],
      total_debt: totalDebt,
      total_minimum_payments: totalMinPayments,
      number_of_debts: debts.length,
      debts: debts.map(debt => ({
        name: debt.name,
        balance: debt.amount,
        interest_rate: debt.interest,
        minimum_payment: debt.regularPayment,
        debt_type: categorizeDebtType(debt.name)
      })),
      snowball_order: [...debts].sort((a, b) => a.amount - b.amount).map((debt, index) => ({
        order: index + 1,
        name: debt.name,
        balance: debt.amount
      })),
      financial_summary: {
        estimated_payoff_months: payoffData.totalMonths,
        estimated_payoff_years: Math.floor(payoffData.totalMonths / 12),
        current_extra_payment: extraPayment,
        debt_free_date: calculateDebtFreeDate()
      }
    };

    const dataStr = JSON.stringify(chatGPTData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `trysnowball-debts-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.regularPayment, 0);

  // Calculate payoff data (simplified version)
  const calculateDetailedPayoff = () => {
    if (debts.length === 0) return { months: [], totalMonths: 0 };
    
    const sortedDebts = [...debts].sort((a, b) => a.amount - b.amount);
    let remainingDebts = sortedDebts.map(debt => ({ ...debt }));
    let availablePayment = totalMinPayments + extraPayment;
    let monthlyData = [];
    let month = 0;

    while (remainingDebts.length > 0 && month < 600) {
      month++;
      let monthlyPayments = {};
      let totalBalance = 0;

      for (let i = 0; i < remainingDebts.length; i++) {
        const debt = remainingDebts[i];
        const monthlyInterest = (debt.interest / 100 / 12) * debt.amount;
        
        let paymentToThisDebt = debt.regularPayment;
        if (i === 0) {
          paymentToThisDebt += availablePayment - totalMinPayments;
        }
        
        const principalPayment = Math.max(0, paymentToThisDebt - monthlyInterest);
        debt.amount = Math.max(0, debt.amount - principalPayment);
        
        monthlyPayments[debt.name] = debt.amount;
        totalBalance += debt.amount;
      }

      monthlyData.push({
        month,
        ...monthlyPayments,
        total: totalBalance
      });

      const initialLength = remainingDebts.length;
      const previousRemainingDebts = [...remainingDebts];
      remainingDebts = remainingDebts.filter(debt => debt.amount > 0.01);
      
      if (remainingDebts.length < initialLength) {
        for (const originalDebt of sortedDebts) {
          const stillExists = remainingDebts.some(rd => rd.id === originalDebt.id);
          const previouslyExisted = previousRemainingDebts.some(rd => rd.id === originalDebt.id);
          
          if (previouslyExisted && !stillExists) {
            availablePayment += originalDebt.regularPayment;
            break;
          }
        }
      }
      
      if (totalBalance < 0.01) break;
    }

    return { months: monthlyData, totalMonths: month };
  };

  const payoffData = calculateDetailedPayoff();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Debt Tracker
          </h1>
          <p className="text-xl text-gray-600">
            {hasOnlyDemoData ? 'Using realistic demo data - clear it out and add your real debts!' : 'Add your debts and see how the snowball method can set you free'}
          </p>
        </div>

        {/* Demo Data Warning */}
        {hasOnlyDemoData && (
          <div className="mb-8 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    You're viewing demo data
                  </h3>
                  <p className="text-sm text-yellow-700">
                    This is realistic sample data. Clear it out and add your real debts for accurate analysis.
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={clearAllData}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                >
                  Clear Demo Data
                </button>
                <button
                  onClick={loadDemoData}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  New Demo Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Debt Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mr-4"
          >
            + Add Debt
          </button>
          {debts.length > 0 && !hasOnlyDemoData && (
            <button
              onClick={clearAllData}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm"
            >
              Clear All Data
            </button>
          )}
        </div>

        {/* Add Debt Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Debt</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Debt Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Credit Card, Car Loan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Owed (£)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="2500"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  placeholder="20"
                  min="0"
                  max="50"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Default is 20% if unknown</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Payment (£)
                </label>
                <input
                  type="number"
                  value={formData.regularPayment}
                  onChange={(e) => setFormData({...formData, regularPayment: e.target.value})}
                  placeholder="75"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Debt
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Debts List */}
        {debts.length > 0 && (
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
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {debts.sort((a, b) => b.amount - a.amount).map((debt, index) => {
                    const utilizationPercent = debt.limit ? (debt.amount / debt.limit) * 100 : 0;
                    const available = debt.limit ? debt.limit - debt.amount : 0;
                    
                    return (
                      <tr key={debt.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {debt.name}
                              {debt.isDemo && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Demo</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-bold text-red-600">£{debt.amount.toLocaleString()}</div>
                          {debt.limit && (
                            <div className={`text-xs font-medium ${
                              utilizationPercent < 75 ? 'text-green-600' : 'text-red-500'
                            }`}>
                              {utilizationPercent.toFixed(0)}% used
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            debt.interest === 0 ? 'bg-green-100 text-green-800' : 
                            debt.interest < 15 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {debt.interest}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          £{debt.regularPayment.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {debt.limit ? `£${debt.limit.toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-green-600">
                            {debt.limit ? `£${available.toLocaleString()}` : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => deleteDebt(debt.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ChatGPT Export Section */}
        {debts.length > 0 && !hasOnlyDemoData && (
          <div className="mb-8 bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">
              🤖 Export for ChatGPT AI Coach
            </h3>
            <p className="text-sm text-purple-800 mb-4">
              Downloaded our AI Debt Coach? Export your debt data to use with your personalized ChatGPT script.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadForChatGPT}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                📥 Download Debt Data for ChatGPT
              </button>
              <a
                href="https://stan.store/trysnowball/p/personal-ai-debt-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-purple-300 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium text-center"
              >
                🛒 Get AI Debt Coach - £2.99
              </a>
            </div>
            <div className="mt-4 text-xs text-purple-600 bg-purple-100 rounded p-3">
              <p><strong>What you'll get:</strong> A structured JSON file with your debt information, payoff timeline, and snowball order - perfectly formatted for the ChatGPT AI Coach script.</p>
            </div>
          </div>
        )}

        {/* Summary & Snowball */}
        {debts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Debt Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Debt:</span>
                  <span className="font-semibold text-red-600">£{totalDebt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Min Payments:</span>
                  <span className="font-semibold">£{totalMinPayments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Debts:</span>
                  <span className="font-semibold">{debts.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg shadow-sm p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Snowball Power</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Extra Monthly Payment (£)
                </label>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  placeholder="100"
                  min="0"
                  step="10"
                  className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {payoffData.totalMonths > 0 && (
                <div className="text-center">
                  <p className="text-sm text-green-700 mb-2">Estimated Payoff Time:</p>
                  <p className="text-2xl font-bold text-green-900">
                    {Math.floor(payoffData.totalMonths / 12)} years, {payoffData.totalMonths % 12} months
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Getting Started Message */}
        {debts.length === 0 && (
          <div className="bg-blue-50 rounded-lg p-8 text-center border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-blue-800 mb-6">
              Add your debts above to see how the snowball method can help you become debt-free faster.
            </p>
            <div className="text-sm text-blue-700 mb-4">
              <p><strong>Tip:</strong> The snowball method pays off your smallest debt first, building momentum and motivation!</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 text-sm text-blue-800">
              <p><strong>🔒 Privacy Note:</strong> All your financial data is stored locally on your device - we never see or store it on our servers.</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebtTracker;