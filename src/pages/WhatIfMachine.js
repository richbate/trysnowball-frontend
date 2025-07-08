import React, { useState, useMemo } from 'react';
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
  // const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

  const calculateScenarios = (debts, extraPayment, totalMinPayments) => {
  const scenarios = {};

  // === Do Nothing Scenario ===
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

  // === Minimum Payments Scenario ===
  const minDebts = JSON.parse(JSON.stringify(debts));
  const minimumOnlyData = [];
  let totalMinInterest = 0;

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
  scenarios.minimumOnly = minimumOnlyData;

  // === Snowball Method Scenario ===
  const snowballDebts = JSON.parse(JSON.stringify(debts)).sort((a, b) => a.balance - b.balance);
  const snowballData = [];
  let totalSnowballInterest = 0;

  for (let month = 0; month <= 60; month++) {
    const total = snowballDebts.reduce((acc, debt) => acc + debt.balance, 0);
    snowballData.push({ month, balance: Math.round(total), interestPaid: totalSnowballInterest });

    if (total <= 0) break;

    let available = totalMinPayments + extraPayment;

    for (let i = 0; i < snowballDebts.length; i++) {
      const debt = snowballDebts[i];
      if (debt.balance <= 0) continue;

      const interest = debt.balance * (debt.rate / 12 / 100);
      totalSnowballInterest += interest;

      const minPrincipal = Math.max(debt.minPayment - interest, 0);
      debt.balance = Math.max(0, debt.balance - minPrincipal);
      available -= debt.minPayment;
    }

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

const scenarios = useMemo(() => calculateScenarios(debts, extraPayment, totalMinPayments), [
  debts,
  extraPayment,
  totalMinPayments,
]);

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

  const snowballPayoffMonths = scenarios.snowball.findIndex(p => p.balance < 1);
  const minimumPayoffMonths = scenarios.minimumOnly.findIndex(p => p.balance < 1);

  // const snowballInterestPaid = scenarios.snowball[snowballPayoffMonths > 0 ? snowballPayoffMonths : scenarios.snowball.length - 1]?.interestPaid || 0;
  // const minimumInterestPaid = scenarios.minimumOnly[minimumPayoffMonths > 0 ? minimumPayoffMonths : scenarios.minimumOnly.length - 1]?.interestPaid || 0;

  // Rest of the JSX remains unchanged and should be placed here
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">What If Machine</h1>
      <p className="mb-4">Extra Payment: £{extraPayment}</p>
      <input
        type="range"
        min="0"
        max="500"
        step="25"
        value={extraPayment}
        onChange={(e) => setExtraPayment(Number(e.target.value))}
      />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip formatter={(v) => formatCurrency(v)} />
          <Legend />
          <Line type="monotone" dataKey="doNothing" stroke="#ef4444" dot={false} />
          <Line type="monotone" dataKey="minimumOnly" stroke="#f59e0b" dot={false} />
          <Line type="monotone" dataKey="snowball" stroke="#10b981" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WhatIfMachine;