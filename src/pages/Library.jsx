import React, { useState } from 'react';

const Library = () => {
  const [activeTab, setActiveTab] = useState('articles');

  const articles = [
    { tag: 'Spending', title: 'Where Does It All Go?', href: 'spending-habits.html', desc: 'Explore the everyday spending leaks...', readTime: '5 min' },
    { tag: 'Spending', title: 'Audit Your Spending', href: 'audit-spending.html', desc: 'A practical, no-blame guide...', readTime: '8 min' },
    { tag: 'Saving', title: 'Saving vs. Debt', href: 'saving-vs-debt.html', desc: 'Emergency fund or debt payoff?', readTime: '6 min' },
    { tag: 'Saving', title: 'Found Money', href: 'found-money.html', desc: 'From skipping takeaways to cancelling subs...', readTime: '4 min' },
    { tag: 'Debt', title: 'Snowball vs Avalanche', href: 'snowball-vs-avalanche.html', desc: 'Why emotion often beats math.', readTime: '7 min' },
    { tag: 'Debt', title: 'Minimum Payments Trap', href: 'minimum-payment-trap.html', desc: 'Minimums aren\'t designed to help you...', readTime: '5 min' },
  ];

  const tools = [
    { 
      title: 'You Need A Budget (YNAB)', 
      desc: 'The gold standard for zero-based budgeting. Perfect for debt payoff planning.',
      link: 'https://www.youneedabudget.com',
      price: '£12/month',
      badge: 'Popular'
    },
    { 
      title: 'Mint (Free)', 
      desc: 'Free spending tracker that connects to your bank accounts.',
      link: 'https://mint.intuit.com',
      price: 'Free',
      badge: 'Free'
    },
    { 
      title: 'Debt Payoff Planner', 
      desc: 'Simple app focused purely on debt elimination strategies.',
      link: 'https://debtpayoffplanner.com',
      price: '£3.99',
      badge: 'Focused'
    },
    { 
      title: 'Spreadsheet Templates', 
      desc: 'Free Google Sheets templates for budget tracking and debt payoff.',
      link: 'https://sheets.google.com',
      price: 'Free',
      badge: 'DIY'
    },
  ];

  const books = [
    { 
      title: 'The Total Money Makeover', 
      author: 'Dave Ramsey',
      desc: 'The debt snowball method explained step-by-step.',
      link: 'https://amzn.to/4eRAiJe',
      price: '£12.99',
      badge: 'Classic'
    },
    { 
      title: 'Your Money or Your Life', 
      author: 'Vicki Robin',
      desc: 'Transform your relationship with money and achieve financial independence.',
      link: 'https://amzn.to/4kPX7OV',
      price: '£14.99',
      badge: 'Life-changing'
    },
    { 
      title: 'The Richest Man in Babylon', 
      author: 'George S. Clason',
      desc: 'Timeless money wisdom in simple parables.',
      link: 'https://amzn.to/464HD5U',
      price: '£8.99',
      badge: 'Timeless'
    },
    { 
      title: 'I Will Teach You to Be Rich', 
      author: 'Ramit Sethi',
      desc: 'No-guilt, practical approach to money for younger audiences.',
      link: 'https://amzn.to/45XCcFI',
      price: '£13.99',
      badge: 'Practical'
    },
  ];

  const resources = [
    { 
      title: 'Debt Snowball Calculator', 
      desc: 'Calculate your debt-free date with different payment strategies.',
      link: 'https://www.vertex42.com/Calculators/debt-reduction-calculator.html',
      type: 'Calculator',
      buttonText: '🧮 Calculate now'
    },
    { 
      title: 'Monthly Budget Template', 
      desc: 'Simple spreadsheet to track income, expenses, and debt payments.',
      link: 'https://www.moneyhelper.org.uk/en/everyday-money/budgeting/budget-planner',
      type: 'Template',
      buttonText: 'View template'
    },
    { 
      title: 'Expense Audit Worksheet', 
      desc: 'Find hidden money leaks in your spending.',
      link: '#',
      type: 'Worksheet',
      buttonText: '🔍 Get worksheet'
    },
    { 
      title: 'CheckMyFile', 
      desc: 'See your full credit report from all 4 UK agencies. Know where you stand.',
      link: 'https://www.checkmyfile.com',
      type: 'Credit Report',
      buttonText: 'Sign up now'
    },
  ];

  const tabs = [
    { id: 'articles', label: '📚 Articles', count: articles.length },
    { id: 'tools', label: '🛠️ Tools & Apps', count: tools.length },
    { id: 'books', label: '📖 Books', count: books.length },
    { id: 'free', label: '🎁 Resources', count: resources.length },
  ];

  const renderArticles = () => (
    <div className="grid gap-4">
      {articles.map(({ tag, title, href, desc, readTime }) => (
        <div key={href} className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs uppercase bg-blue-100 text-blue-600 rounded-full font-medium">{tag}</span>
            <span className="text-sm text-gray-500">{readTime}</span>
          </div>
          <a href={href} className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">{title}</a>
          <p className="text-gray-600 mt-2">{desc}</p>
        </div>
      ))}
    </div>
  );

  const renderTools = () => (
    <div className="grid gap-4 md:grid-cols-2">
      {tools.map(({ title, desc, link, price, badge }) => (
        <div key={title} className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full font-medium">{badge}</span>
            <span className="text-sm font-semibold text-gray-900">{price}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{desc}</p>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Try it out →
          </a>
        </div>
      ))}
    </div>
  );

  const renderBooks = () => (
    <div className="grid gap-4 md:grid-cols-2">
      {books.map(({ title, author, desc, link, price, badge }) => (
        <div key={title} className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-full font-medium">{badge}</span>
            <span className="text-sm font-semibold text-gray-900">{price}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-2">by {author}</p>
          <p className="text-gray-600 mb-4">{desc}</p>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
          >
            📚 Buy on Amazon →
          </a>
        </div>
      ))}
    </div>
  );

  const renderResources = () => (
    <div className="grid gap-4 md:grid-cols-2">
      {resources.map(({ title, desc, link, type, buttonText }) => (
        <div key={title} className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs bg-emerald-100 text-emerald-600 rounded-full font-medium">{type}</span>
            <span className="text-sm font-semibold text-emerald-600">FREE</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{desc}</p>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            {buttonText} →
          </a>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'articles': return renderArticles();
      case 'tools': return renderTools();
      case 'books': return renderBooks();
      case 'free': return renderResources();
      default: return renderArticles();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📚 Library</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your money with tools, books, and resources that actually help you become debt-free. 
            No get-rich-quick schemes, just proven strategies.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-sm transform scale-105'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {renderContent()}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center p-8 bg-blue-50 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to start your debt-free journey?</h3>
          <p className="text-gray-600 mb-4">Track your progress with our free debt snowball calculator.</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            🚀 Try the What If Machine
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;