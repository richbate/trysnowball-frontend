import React, { useState } from 'react';

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

  const editDebt = (id, updatedDebt) => {
    setDebts(debts.map(debt => debt.id === id ? { ...debt, ...updatedDebt } : debt));
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.regularPayment, 0);

  // Simple debt payoff calculation (snowball method)
  const calculatePayoff = () => {
    if (debts.length === 0) return null;
    
    const sortedDebts = [...debts].sort((a, b) => a.amount - b.amount); // Smallest first
    let totalMonths = 0;
    let remainingDebts = sortedDebts.map(debt => ({ ...debt }));
    let availablePayment = totalMinPayments + extraPayment;

    while (remainingDebts.length > 0) {
      const targetDebt = remainingDebts[0];
      const monthlyInterest = (targetDebt.interest / 100 / 12) * targetDebt.amount;
      const principalPayment = availablePayment - monthlyInterest;
      
      if (principalPayment <= 0) break;
      
      const monthsToPayOff = Math.ceil(targetDebt.amount / principalPayment);
      totalMonths += monthsToPayOff;
      
      // Remove paid debt and add its payment to available amount
      availablePayment += targetDebt.regularPayment;
      remainingDebts.shift();
    }

    return totalMonths;
  };

  const payoffMonths = calculatePayoff();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Add Debt
          </button>
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
                  required
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
                  required
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
                  required
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
              {payoffMonths && (
                <div className="text-center">
                  <p className="text-sm text-green-700 mb-2">Estimated Payoff Time:</p>
                  <p className="text-2xl font-bold text-green-900">
                    {Math.floor(payoffMonths / 12)} years, {payoffMonths % 12} months
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
            <div className="text-sm text-blue-700">
              <p><strong>Tip:</strong> The snowball method pays off your smallest debt first, building momentum and motivation!</p>
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