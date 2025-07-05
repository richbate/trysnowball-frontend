import React, { useState, useEffect } from 'react';

const DebtTracker = ({ onPageChange }) => {
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
        setDebts(parsedDebts);
      } catch (error) {
        console.error('Error loading saved debts:', error);
      }
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
      regularPayment: parseFloat(formData.regularPayment)
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

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.regularPayment, 0);

  // Enhanced debt payoff calculation with month-by-month breakdown
  const calculateDetailedPayoff = () => {
    if (debts.length === 0) return { months: [], totalMonths: 0 };
    
    const sortedDebts = [...debts].sort((a, b) => a.amount - b.amount); // Smallest first (snowball)
    let remainingDebts = sortedDebts.map(debt => ({ ...debt }));
    let availablePayment = totalMinPayments + extraPayment;
    let monthlyData = [];
    let month = 0;

    while (remainingDebts.length > 0 && month < 600) { // Cap at 50 years
      month++;
      let monthlyPayments = {};
      let totalBalance = 0;

      // Apply payments to debts
      for (let i = 0; i < remainingDebts.length; i++) {
        const debt = remainingDebts[i];
        const monthlyInterest = (debt.interest / 100 / 12) * debt.amount;
        
        let paymentToThisDebt = debt.regularPayment;
        
        // If this is the target debt (smallest), give it all extra payment
        if (i === 0) {
          paymentToThisDebt += availablePayment - totalMinPayments;
        }
        
        const principalPayment = Math.max(0, paymentToThisDebt - monthlyInterest);
        debt.amount = Math.max(0, debt.amount - principalPayment);
        
        monthlyPayments[debt.name] = debt.amount;
        totalBalance += debt.amount;
      }

      // Store month data
      monthlyData.push({
        month,
        ...monthlyPayments,
        total: totalBalance
      });

      // Remove paid-off debts and add their payments to available pool
      const initialLength = remainingDebts.length;
      remainingDebts = remainingDebts.filter(debt => debt.amount > 0.01);
      
      // If we paid off a debt, add its minimum payment to available payment
      if (remainingDebts.length < initialLength) {
        const paidOffDebt = sortedDebts.find(d => !remainingDebts.find(rd => rd.id === d.id));
        if (paidOffDebt) {
          availablePayment += paidOffDebt.regularPayment;
        }
      }
      
      if (totalBalance < 0.01) break;
    }

    return { months: monthlyData, totalMonths: month };
  };

  const payoffData = calculateDetailedPayoff();

  // Simple chart component using CSS
  const PayoffChart = ({ data }) => {
    if (!data || data.length === 0) return null;

    const maxBalance = Math.max(...data.map(d => d.total));
    const chartHeight = 200;
    const chartWidth = Math.min(800, data.length * 8);

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Debt Payoff Visualization</h3>
        <div className="overflow-x-auto">
          <div style={{ width: `${chartWidth}px`, height: `${chartHeight}px` }} className="relative border-l-2 border-b-2 border-gray-300">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500" style={{ marginLeft: '-40px' }}>
              <span>£{Math.round(maxBalance).toLocaleString()}</span>
              <span>£{Math.round(maxBalance * 0.75).toLocaleString()}</span>
              <span>£{Math.round(maxBalance * 0.5).toLocaleString()}</span>
              <span>£{Math.round(maxBalance * 0.25).toLocaleString()}</span>
              <span>£0</span>
            </div>
            
            {/* Chart area */}
            <svg width={chartWidth} height={chartHeight} className="absolute top-0 left-0">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((percentage, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={chartHeight * percentage}
                  x2={chartWidth}
                  y2={chartHeight * percentage}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              
              {/* Debt payoff line */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points={data.map((d, i) => 
                  `${(i / (data.length - 1)) * chartWidth},${chartHeight - (d.total / maxBalance) * chartHeight}`
                ).join(' ')}
              />
              
              {/* Individual debt lines */}
              {debts.map((debt, debtIndex) => {
                const color = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'][debtIndex % 6];
                return (
                  <polyline
                    key={debt.id}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity="0.7"
                    points={data.map((d, i) => 
                      `${(i / (data.length - 1)) * chartWidth},${chartHeight - ((d[debt.name] || 0) / maxBalance) * chartHeight}`
                    ).join(' ')}
                  />
                );
              })}
            </svg>
            
            {/* X-axis labels (every 12 months) */}
            <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-500" style={{ marginTop: '10px' }}>
              {data.filter((_, i) => i % 12 === 0).slice(0, 8).map((d, i) => (
                <span key={i}>Year {Math.floor(d.month / 12) + 1}</span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Total Debt</span>
          </div>
          {debts.map((debt, index) => {
            const color = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'][index % 6];
            return (
              <div key={debt.id} className="flex items-center">
                <div className="w-4 h-0.5 mr-2" style={{ backgroundColor: color }}></div>
                <span className="text-sm text-gray-600">{debt.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Debt Tracker
          </h1>
          <p className="text-xl text-gray-600">
            Add your debts and see how the snowball method can set you free
          </p>
        </div>

        {/* Add Debt Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mr-4"
          >
            + Add Debt
          </button>
          {debts.length > 0 && (
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Debts</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Amount</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Interest</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Min Payment</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debts.map((debt) => (
                      <tr key={debt.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{debt.name}</td>
                        <td className="py-3 px-4 text-right">£{debt.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">{debt.interest}%</td>
                        <td className="py-3 px-4 text-right">£{debt.regularPayment}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteDebt(debt.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Chart Section */}
        {debts.length > 0 && payoffData.months.length > 0 && (
          <div className="mb-8">
            <PayoffChart data={payoffData.months} />
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
            onClick={() => onPageChange('home')}
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