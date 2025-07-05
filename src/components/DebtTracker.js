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

  // Enhanced debt payoff calculation with month-by-month breakdown - PROPERLY FIXED
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
      
      // If we paid off debts, add their minimum payments to available payment
      const debtsRemoved = initialLength - remainingDebts.length;
      if (debtsRemoved > 0) {
        // Calculate total payments from removed debts
        let additionalPayment = 0;
        for (const originalDebt of sortedDebts) {
          let stillExists = false;
          for (const remaining of remainingDebts) {
            if (remaining.id === originalDebt.id) {
              stillExists = true;
              break;
            }
          }
          if (!stillExists) {
            additionalPayment += originalDebt.regularPayment;
          }
        }
        // Only add payments from debts that were just paid off this month
        if (additionalPayment > 0) {
          availablePayment = totalMinPayments + extraPayment;
          for (const remaining of remainingDebts) {
            availablePayment += remaining.regularPayment;
          }
        }
      }
      
      if (totalBalance < 0.01) break;
    }

    return { months: monthlyData, totalMonths: month };
  };

  const payoffData = calculateDetailedPayoff();

  // Enhanced chart component with stacked areas
  const PayoffChart = ({ data, debts }) => {
    if (!data || data.length === 0) return null;

    const maxBalance = Math.max(...data.map(d => d.total));
    const chartHeight = 300;
    const chartWidth = Math.min(1000, Math.max(600, data.length * 6));
    const colors = [
      '#ef4444', // red
      '#f97316', // orange  
      '#eab308', // yellow
      '#22c55e', // green
      '#3b82f6', // blue
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#10b981'  // emerald
    ];

    // Create stacked data
    const stackedData = data.map(monthData => {
      let stackedValues = [];
      let runningTotal = 0;
      
      debts.forEach((debt, index) => {
        const debtAmount = monthData[debt.name] || 0;
        stackedValues.push({
          name: debt.name,
          value: debtAmount,
          stackStart: runningTotal,
          stackEnd: runningTotal + debtAmount,
          color: colors[index % colors.length]
        });
        runningTotal += debtAmount;
      });
      
      return {
        month: monthData.month,
        total: monthData.total,
        stacks: stackedValues
      };
    });

    const getYPosition = (value) => chartHeight - (value / maxBalance) * chartHeight;
    const getXPosition = (index) => (index / (data.length - 1)) * chartWidth;

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Debt Payoff Journey</h3>
          <div className="text-sm text-gray-500">
            {data.length} months to freedom
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div style={{ width: `${chartWidth}px`, height: `${chartHeight + 60}px` }} className="relative">
            
            {/* Chart container with padding for labels */}
            <div className="relative" style={{ marginLeft: '60px', marginBottom: '40px', width: `${chartWidth}px`, height: `${chartHeight}px` }}>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500" style={{ marginLeft: '-50px', width: '45px' }}>
                <span className="text-right">£{Math.round(maxBalance).toLocaleString()}</span>
                <span className="text-right">£{Math.round(maxBalance * 0.75).toLocaleString()}</span>
                <span className="text-right">£{Math.round(maxBalance * 0.5).toLocaleString()}</span>
                <span className="text-right">£{Math.round(maxBalance * 0.25).toLocaleString()}</span>
                <span className="text-right">£0</span>
              </div>
              
              {/* Chart SVG */}
              <svg width={chartWidth} height={chartHeight} className="border-l-2 border-b-2 border-gray-300">
                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map((percentage, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={chartHeight * percentage}
                    x2={chartWidth}
                    y2={chartHeight * percentage}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Vertical grid lines */}
                {data.filter((_, i) => i % 12 === 0).map((_, i) => (
                  <line
                    key={i}
                    x1={getXPosition(i * 12)}
                    y1="0"
                    x2={getXPosition(i * 12)}
                    y2={chartHeight}
                    stroke="#f9fafb"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Stacked areas for each debt */}
                {debts.map((debt, debtIndex) => {
                  const color = colors[debtIndex % colors.length];
                  
                  // Create path for this debt's area
                  let pathData = '';
                  
                  // Start from bottom of previous debt or bottom
                  stackedData.forEach((monthData, i) => {
                    const x = getXPosition(i);
                    const stackInfo = monthData.stacks[debtIndex];
                    const yBottom = getYPosition(stackInfo.stackStart);
                    const yTop = getYPosition(stackInfo.stackEnd);
                    
                    if (i === 0) {
                      pathData += `M ${x} ${yBottom} L ${x} ${yTop}`;
                    } else {
                      pathData += ` L ${x} ${yTop}`;
                    }
                  });
                  
                  // Complete the area by going back along the bottom
                  for (let i = stackedData.length - 1; i >= 0; i--) {
                    const x = getXPosition(i);
                    const stackInfo = stackedData[i].stacks[debtIndex];
                    const yBottom = getYPosition(stackInfo.stackStart);
                    pathData += ` L ${x} ${yBottom}`;
                  }
                  
                  pathData += ' Z'; // Close the path
                  
                  return (
                    <path
                      key={debt.id}
                      d={pathData}
                      fill={color}
                      fillOpacity="0.8"
                      stroke={color}
                      strokeWidth="1"
                    />
                  );
                })}
                
                {/* Total debt outline */}
                <polyline
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="2"
                  points={stackedData.map((d, i) => 
                    `${getXPosition(i)},${getYPosition(d.total)}`
                  ).join(' ')}
                />
                
                {/* Hover points */}
                {stackedData.filter((_, i) => i % 6 === 0).map((d, i) => (
                  <circle
                    key={i}
                    cx={getXPosition(i * 6)}
                    cy={getYPosition(d.total)}
                    r="3"
                    fill="#1f2937"
                    className="hover:r-5 transition-all cursor-pointer"
                  />
                ))}
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-500" style={{ marginTop: '10px' }}>
                <span>Start</span>
                {data.filter((_, i) => i % Math.max(12, Math.floor(data.length / 6)) === 0).slice(1, -1).map((d, i) => (
                  <span key={i}>
                    {Math.floor(d.month / 12)}yr {d.month % 12}mo
                  </span>
                ))}
                <span>Debt Free! 🎉</span>
              </div>
            </div>
            
            {/* Enhanced Legend */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {debts.map((debt, index) => {
                const color = colors[index % colors.length];
                const finalAmount = data[data.length - 1]?.[debt.name] || 0;
                const isCompleted = finalAmount < 1;
                
                return (
                  <div key={debt.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <div 
                      className="w-4 h-4 rounded-sm border border-gray-300" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {debt.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isCompleted ? '✅ Paid off!' : `£${Math.round(finalAmount).toLocaleString()} left`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Chart insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-lg font-bold text-blue-900">
                  £{maxBalance.toLocaleString()}
                </div>
                <div className="text-sm text-blue-700">Starting Debt</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-lg font-bold text-green-900">
                  {Math.floor(data.length / 12)} years, {data.length % 12} months
                </div>
                <div className="text-sm text-green-700">To Freedom</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-lg font-bold text-purple-900">
                  {debts.length}
                </div>
                <div className="text-sm text-purple-700">Debts to Conquer</div>
              </div>
            </div>
          </div>
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
            <PayoffChart data={payoffData.months} debts={debts} />
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