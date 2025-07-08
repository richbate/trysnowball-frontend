import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const WhatIfMachine = () => {
  const [extraPayment, setExtraPayment] = useState(100);

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

  const calculateScenarios = () => {
    const scenarios = {};

    // Do Nothing (interest only)
    const doNothingData = [];
    for (let month = 0; month <= 60; month++) {
      const total = debts.reduce((acc, debt) => {
        const monthlyRate = debt.rate / 12 / 100;
        const futureBalance = debt.balance * Math.pow(1 + monthlyRate, month);
        return acc + futureBalance;
      }, 0);
      doNothingData.push({ month, balance: Math.round(total) });
    }
    scenarios.doNothing = doNothingData;

    // Minimum Payments
const minDebts = JSON.parse(JSON.stringify(debts));
const minimumOnlyData = [];
let totalMinInterest = 0;

// Calculate total interest outside of loop to satisfy ESLint
for (let i = 0; i < minDebts.length; i++) {
  const debt = minDebts[i];
  const months = simulateMinimum(debt);
  totalMinInterest += months.reduce((sum, m) => sum + m.interest, 0);
}

for (let month = 0; month <= 60; month++) {
  const total = minDebts.reduce((acc, debt) => acc + debt.balance, 0);
  minimumOnlyData.push({ month, balance: Math.round(total), interestPaid: totalMinInterest });

  for (let i = 0; i < minDebts.length; i++) {
    const debt = minDebts[i];
    if (debt.balance <= 0) continue;

    const interest = debt.balance * (debt.rate / 12 / 100);
    totalMinInterest += interest;

    const principal = Math.max(debt.minPayment - interest, 0);
    debt.balance = Math.max(debt.balance - principal, 0);
  }
}
      
      // Calculate next month
for (let i = 0; i < minDebts.length; i++) {
  const debt = minDebts[i];
  if (debt.balance <= 0) continue;

  const interest = debt.balance * (debt.rate / 12 / 100);
  totalMinInterest += interest;

  const principal = Math.max(debt.minPayment - interest, 0);
  debt.balance = Math.max(debt.balance - principal, 0);
}

    // Snowball Method
    const snowballDebts = JSON.parse(JSON.stringify(debts)).sort((a, b) => a.balance - b.balance);
    const snowballData = [];
    let totalSnowballInterest = 0;
    
    for (let month = 0; month <= 60; month++) {
      const total = snowballDebts.reduce((acc, debt) => acc + debt.balance, 0);
      snowballData.push({ month, balance: Math.round(total), interestPaid: totalSnowballInterest });

      if (total <= 0) break;

      // Calculate payments for this month
      let available = totalMinPayments + extraPayment;
      
      // Pay minimums first, then extra to smallest debt
for (let i = 0; i < snowballDebts.length; i++) {
  const debt = snowballDebts[i];
  if (debt.balance <= 0) continue;

  const interest = debt.balance * (debt.rate / 12 / 100);
  totalSnowballInterest += interest;

  const minPrincipal = Math.max(debt.minPayment - interest, 0);
  debt.balance = Math.max(0, debt.balance - minPrincipal);
  available -= debt.minPayment;
}
      
      // Apply extra payment to smallest remaining debt
      if (available > 0) {
        for (let debt of snowballDebts) {
          if (debt.balance > 0) {
            const extraPaymentAmount = Math.min(available, debt.balance);
            debt.balance -= extraPaymentAmount;
            break;
          }
        }
      }
    }
    scenarios.snowball = snowballData;

    return scenarios;
  };

  const scenarios = calculateScenarios();

  const chartData = [];
  for (let i = 0; i < 61; i++) {
    chartData.push({
      month: i,
      doNothing: scenarios.doNothing[i]?.balance || 0,
      minimumOnly: scenarios.minimumOnly[i]?.balance || 0,
      snowball: scenarios.snowball[i]?.balance || 0,
    });
  }

  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '£0';
    return '£' + value.toLocaleString(undefined, { minimumFractionDigits: 0 });
  };

  // Calculate key metrics
  const snowballPayoffMonths = scenarios.snowball.findIndex(p => p.balance === 0);
  const minimumPayoffMonths = scenarios.minimumOnly.findIndex(p => p.balance === 0);
  
  const snowballInterestPaid = scenarios.snowball[snowballPayoffMonths > 0 ? snowballPayoffMonths : scenarios.snowball.length - 1]?.interestPaid || 0;
  const minimumInterestPaid = scenarios.minimumOnly[minimumPayoffMonths > 0 ? minimumPayoffMonths : scenarios.minimumOnly.length - 1]?.interestPaid || 0;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
          What If Machine
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Adjust extra payments to see how fast you could be debt-free.
        </p>

        <div className="flex items-center gap-4 mb-6 justify-center">
          <label className="font-medium">Extra Payment:</label>
          <input
            type="range"
            min="0"
            max="500"
            step="25"
            value={extraPayment}
            onChange={(e) => setExtraPayment(Number(e.target.value))}
          />
          <span className="text-green-600 font-semibold">{formatCurrency(extraPayment)}</span>
        </div>

        {/* Debt Table */}
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-2 px-4 text-left">Debt</th>
                <th className="py-2 px-4 text-right">Balance</th>
                <th className="py-2 px-4 text-right">Interest Rate</th>
                <th className="py-2 px-4 text-right">Min Payment</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="py-2 px-4">{debt.name}</td>
                  <td className="py-2 px-4 text-right">£{debt.balance.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">{debt.rate}%</td>
                  <td className="py-2 px-4 text-right">£{debt.minPayment.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

<ResponsiveContainer width="100%" height={400}>
  <LineChart 
    data={chartData}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}  // Reduced from 60
  >
    <CartesianGrid stroke="#e5e7eb" />
    <XAxis 
      dataKey="month" 
      type="number"
      domain={[0, 60]}
      ticks={[0, 12, 24, 36, 48, 60]}
      tickFormatter={(month) => {
        if (month === 0) return 'Now';
        return `${month / 12}y`;
      }}
      tick={{ fontSize: 12 }}
    />
    <YAxis 
      tickFormatter={formatCurrency}
    />
    <Tooltip formatter={(v) => formatCurrency(v)} />
    <Legend 
  iconType="rect"
  formatter={(value) => 
    value === 'doNothing' ? 'Do Nothing (Interest Only)' :
    value === 'minimumOnly' ? 'Minimum Payments Only' :
    'Snowball Method'
  }
    wrapperStyle={{ paddingBottom: '10px' }}
/>


<Line type="monotone" dataKey="doNothing" stroke="#ef4444" strokeWidth={2} dot={false} />
<Line type="monotone" dataKey="minimumOnly" stroke="#f59e0b" strokeWidth={2} dot={false} />
<Line type="monotone" dataKey="snowball" stroke="#10b981" strokeWidth={2} dot={false} />
  </LineChart>
</ResponsiveContainer>

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
              {minimumPayoffMonths > 0 ? minimumPayoffMonths : 'Never'} {minimumPayoffMonths > 0 ? 'months' : ''}
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
              {snowballPayoffMonths > 0 ? snowballPayoffMonths : 'Never'} {snowballPayoffMonths > 0 ? 'months' : ''}
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
                {formatCurrency(Math.max(0, minimumInterestPaid - snowballInterestPaid))}
              </p>
              <p className="text-sm text-gray-600">in interest payments</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">You'll be debt-free</p>
              <p className="text-3xl font-bold text-blue-600">
                {Math.max(0, minimumPayoffMonths - snowballPayoffMonths)}
              </p>
              <p className="text-sm text-gray-600">months sooner</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 text-center">
              <strong>Your extra £{extraPayment}/month</strong> transforms into <strong>£{formatCurrency(Math.max(0, minimumInterestPaid - snowballInterestPaid))}</strong> in savings. 
              {snowballPayoffMonths > 0 && extraPayment > 0 && (
                <>
                  That's a <strong>{Math.round(Math.max(0, minimumInterestPaid - snowballInterestPaid) / (extraPayment * snowballPayoffMonths) * 100)}% return</strong> on your extra payments!
                </>
              )}
            </p>
          </div>
        </div>

        <p className="text-sm text-center text-gray-500 mt-4">
          Built with real debt data using the Snowball method.
        </p>
      </div>
    </div>
  );
};

export default WhatIfMachine;