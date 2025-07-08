import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
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
    const scenarios = [];

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

    const snowballData = [{ month: 0, balance: totalDebt }];
    let snowballDebts = [...debts].sort((a, b) => a.balance - b.balance);

    for (let month = 1; month <= 60; month++) {
      const totalPayment = totalMinPayments + extraPayment;
      let remainingPayment = totalPayment;

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

  const chartData = [];
  const maxLength = Math.max(
    scenarios.doNothing.length,
    scenarios.minimumOnly.length,
    scenarios.snowball.length
  );

  for (let i = 0; i < maxLength; i++) {
    const dataPoint = { month: i };
    if (scenarios.doNothing[i]) dataPoint.doNothing = scenarios.doNothing[i].balance;
    if (scenarios.minimumOnly[i]) dataPoint.minimumOnly = scenarios.minimumOnly[i].balance;
    if (scenarios.snowball[i]) dataPoint.snowball = scenarios.snowball[i].balance;
    chartData.push(dataPoint);
  }

  const formatCurrency = (value) => `£${value?.toLocaleString() || 0}`;

  const snowballPayoffMonths = scenarios.snowball.length - 1;
  const minimumPayoffMonths = scenarios.minimumOnly.length - 1;

  const snowballTotalPaid = snowballPayoffMonths * (totalMinPayments + extraPayment);
  const snowballInterestPaid = snowballTotalPaid - totalDebt;

  const minimumTotalPaid = minimumPayoffMonths * totalMinPayments;
  const minimumInterestPaid = minimumTotalPaid - totalDebt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* keep your existing JSX UI exactly as it is here (header, chart, stats, footer) */}
    </div>
  );
};

export default WhatIfMachine;