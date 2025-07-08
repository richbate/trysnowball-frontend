import React from 'react';

const Library = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <h1 className="text-3xl font-bold mb-4">Library</h1>
    <p className="mb-6">Master your money. No lectures, no jargon — just real strategies that work.</p>

    <div className="grid gap-4">
      {[
        { tag: 'Spending', title: 'Where Does It All Go?', href: 'spending-habits.html', desc: 'Explore the everyday spending leaks...' },
        { tag: 'Spending', title: 'Audit Your Spending', href: 'audit-spending.html', desc: 'A practical, no-blame guide...' },
        { tag: 'Saving', title: 'Saving vs. Debt', href: 'saving-vs-debt.html', desc: 'Emergency fund or debt payoff?' },
        { tag: 'Saving', title: 'Found Money', href: 'found-money.html', desc: 'From skipping takeaways to cancelling subs...' },
        { tag: 'Debt', title: 'Snowball vs Avalanche', href: 'snowball-vs-avalanche.html', desc: 'Why emotion often beats math.' },
        { tag: 'Debt', title: 'Minimum Payments Trap', href: 'minimum-payment-trap.html', desc: 'Minimums aren’t designed to help you...' },
      ].map(({ tag, title, href, desc }) => (
        <div key={href} className="p-4 border rounded bg-white shadow-sm">
          <span className="block text-xs uppercase text-gray-500 mb-1">{tag}</span>
          <a href={href} className="text-xl font-semibold text-blue-600 hover:underline">{title}</a>
          <p className="text-sm mt-1 text-gray-700">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Library;