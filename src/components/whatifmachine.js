import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrySnowballTool = () => {
  const [extraPayment, setExtraPayment] = useState(100);
  
  // Your actual debt data
  const debts = [
    { name: 'PayPal', balance: 875, rate: 0, minPayment: 50 },
    { name: 'Virgin', balance: 1654, rate: 20, minPayment: 24.9 },
    { name: 'Barclaycard', balance: 2930, rate: 20, minPayment: 56 },
    { name: 'Halifax 1', balance: 2975, rate: 20, minPayment: 131 },
    { name: 'NatWest', balance: 6486, rate: 0, minPayment: 55 },
    { name: 'Halifax 2', balance: 8823, rate: 20, minPayment: 254 },
    { name: 'MBNA', balance: 10198, rate: 20, minPayment: 311 }
  ];

  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

  // Calculate scenarios
  const calculateScenarios = () => {
    const scenarios = [];
    
    // Scenario 1: Do Nothing (interest only)
    let doNothingBalance = totalDebt;
    const doNothingData = [{ month: 0, balance: doNothingBalance }];
    
    for (let month = 1; month <= 60; month++) {
      doNothingBalance = debts.reduce((total, debt) => {
        const monthlyRate = debt.rate / 100 / 12;
        const currentBalance = debt.balance * Math.pow(1 + monthlyRate, month);
        return total + currentBalance;
      }, 0);
      doNothingData.push({ month, balance: Math.round(doNothingBalance) });
    }

    // Scenario 2: Minimum Payments Only
    const minimumPaymentData = [{ month: 0, balance: totalDebt }];
    let minPaymentDebts = [...debts];
    
    for (let month = 1; month <= 60; month++) {
      minPaymentDebts = minPaymentDebts.map(debt => {
        if (debt.balance <= 0) return debt;
        
        const monthlyRate = debt.rate / 100 / 12;
        const interestPayment = debt.balance * monthlyRate;
        const principalPayment = Math.max(0, debt.minPayment - interestPayment);
        
        return {
          ...debt,
          balance: Math.max(0, debt.balance - principalPayment)
        };
      });
      
      const totalBalance = minPaymentDebts.reduce((sum, debt) => sum + debt.balance, 0);
      minimumPaymentData.push({ month, balance: Math.round(totalBalance) });
      
      if (totalBalance <= 0) break;
    }

    // Scenario 3: Snowball Method with Extra Payment
    const snowballData = [{ month: 0, balance: totalDebt }];
    let snowballDebts = [...debts].sort((a, b) => a.balance - b.balance);
    
    for (let month = 1; month <= 60; month++) {
      const totalPayment = totalMinPayments + extraPayment;
      let remainingPayment = totalPayment;
      
      // Pay minimums first
      snowballDebts = snowballDebts.map(debt => {
        if (debt.balance <= 0) return debt;
        
        const monthlyRate = debt.rate / 100 / 12;
        const interestPayment = debt.balance * monthlyRate;
        const minPrincipal = Math.max(0, debt.minPayment - interestPayment);
        
        remainingPayment -= debt.minPayment;
        
        return {
          ...debt,
          balance: Math.max(0, debt.balance - minPrincipal)
        };
      });
      
      // Apply extra payment to smallest debt
      if (remainingPayment > 0) {
        for (let i = 0; i < snowballDebts.length; i++) {
          if (snowballDebts[i].balance > 0) {
            const payment = Math.min(remainingPayment, snowballDebts[i].balance);
            snowballDebts[i].balance -= payment;
            remainingPayment -= payment;
            break;
          }
        }
      }
      
      const totalBalance = snowballDebts.reduce((sum, debt) => sum + debt.balance, 0);
      snowballData.push({ month, balance: Math.round(totalBalance) });
      
      if (totalBalance <= 0) break;
    }

    return {
      doNothing: doNothingData.slice(0, 61),
      minimumOnly: minimumPaymentData,
      snowball: snowballData
    };
  };

  const scenarios = calculateScenarios();
  
  // Combine data for chart
  const chartData = [];
  const maxLength = Math.max(
    scenarios.doNothing.length,
    scenarios.minimumOnly.length,
    scenarios.snowball.length
  );
  
  for (let i = 0; i < maxLength; i++) {
    const dataPoint = { month: i };
    
    if (scenarios.doNothing[i]) {
      dataPoint.doNothing = scenarios.doNothing[i].balance;
    }
    
    if (scenarios.minimumOnly[i]) {
      dataPoint.minimumOnly = scenarios.minimumOnly[i].balance;
    }
    
    if (scenarios.snowball[i]) {
      dataPoint.snowball = scenarios.snowball[i].balance;
    }
    
    chartData.push(dataPoint);
  }

  const formatCurrency = (value) => `£${value?.toLocaleString() || 0}`;
  
  // Calculate payoff months
  const snowballPayoffMonths = scenarios.snowball.length - 1;
  const minimumPayoffMonths = scenarios.minimumOnly.length - 1;
  
  // Calculate total interest paid
  const snowballTotalPaid = snowballPayoffMonths * (totalMinPayments + extraPayment);
  const snowballInterestPaid = snowballTotalPaid - totalDebt;
  
  const minimumTotalPaid = minimumPayoffMonths * totalMinPayments;
  const minimumInterestPaid = minimumTotalPaid - totalDebt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TrySnowball.co.uk</h1>
          <p className="text-xl text-gray-600">See the power of the debt snowball method</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-gray-700">Your total debt: <span className="text-red-600">{formatCurrency(totalDebt)}</span></p>
              <p className="text-sm text-gray-500">Minimum payments: {formatCurrency(totalMinPayments)}/month</p>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Extra monthly payment:</label>
              <input
                type="range"
                min="0"
                max="500"
                step="25"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-lg font-semibold text-green-600 w-20">{formatCurrency(extraPayment)}</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Debt Journey: Three Scenarios</h2>
          
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                label={{ value: 'Debt Balance', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  formatCurrency(value),
                  name === 'doNothing' ? 'Do Nothing' :
                  name === 'minimumOnly' ? 'Minimum Payments' :
                  'Snowball Method'
                ]}
                labelFormatter={(month) => `Month ${month}`}
              />
              <Legend 
                formatter={(value) => 
                  value === 'doNothing' ? 'Do Nothing (Interest Only)' :
                  value === 'minimumOnly' ? 'Minimum Payments Only' :
                  'Snowball Method'
                }
              />
              <Line 
                type="monotone" 
                dataKey="doNothing" 
                stroke="#ef4444" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="doNothing"
              />
              <Line 
                type="monotone" 
                dataKey="minimumOnly" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="minimumOnly"
              />
              <Line 
                type="monotone" 
                dataKey="snowball" 
                stroke="#10b981" 
                strokeWidth={4}
                name="snowball"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Do Nothing */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-800">Do Nothing</h3>
            </div>
            <p className="text-3xl font-bold text-red-600 mb-2">
              {formatCurrency(scenarios.doNothing[12]?.balance)}
            </p>
            <p className="text-sm text-red-700">After 1 year</p>
            <p className="text-xs text-red-600 mt-2">
              +{formatCurrency(scenarios.doNothing[12]?.balance - totalDebt)} in interest
            </p>
          </div>

          {/* Minimum Payments */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <div className="bg-yellow-100 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-yellow-800">Minimum Payments</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600 mb-1">
              {minimumPayoffMonths} months
            </p>
            <p className="text-sm text-yellow-700">to pay off</p>
            <p className="text-xs text-yellow-600 mt-2">
              {formatCurrency(minimumInterestPaid)} total interest
            </p>
          </div>

          {/* Snowball */}
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-800">Snowball Method</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-1">
              {snowballPayoffMonths} months
            </p>
            <p className="text-sm text-green-700">to pay off</p>
            <p className="text-xs text-green-600 mt-2">
              {formatCurrency(snowballInterestPaid)} total interest
            </p>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">The Snowball Advantage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">You'll save</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(minimumInterestPaid - snowballInterestPaid)}
              </p>
              <p className="text-sm text-gray-600">in interest payments</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">You'll be debt-free</p>
              <p className="text-3xl font-bold text-blue-600">
                {minimumPayoffMonths - snowballPayoffMonths}
              </p>
              <p className="text-sm text-gray-600">months sooner</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 text-center">
              <strong>Your extra £{extraPayment}/month</strong> transforms into <strong>£{formatCurrency(minimumInterestPaid - snowballInterestPaid)}</strong> in savings. 
              That's a <strong>{Math.round((minimumInterestPaid - snowballInterestPaid) / (extraPayment * snowballPayoffMonths) * 100)}% return</strong> on your extra payments!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Built with real debt data to show the power of the snowball method</p>
        </div>
      </div>
    </div>
  );
};

export default WhatIfMachine;