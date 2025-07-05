import React, { useState } from 'react';
import WhatIfMachine from './components/whatifmachine';

// Simple Navigation Component
const Navigation = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'what-if', label: 'What If Machine' },
    { id: 'library', label: 'Library' }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => onPageChange('home')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              TrySnowball
            </button>
          </div>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Your Original Homepage Component
const HomePage = ({ onPageChange }) => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 px-6 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">TrySnowball</h1>
        <p className="text-xl max-w-2xl mx-auto mb-6 opacity-90">
          Smash your debt with smart tools, clear insight, and a dose of momentum.
        </p>
        <p className="text-md max-w-xl mx-auto mb-8 opacity-80">
          Make better decisions. Get back in control.
        </p>
        <button
          onClick={() => onPageChange('what-if')}
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-100 transition"
        >
          Try the What If Machine
        </button>
      </header>

      {/* About */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What is TrySnowball?</h2>
        <p className="text-lg opacity-80 leading-relaxed">
          TrySnowball is part planner, part progress tracker, part motivational coach. It helps you stay focused, build better money habits, and clear debt faster — with less stress and more clarity.
        </p>
      </section>

      {/* What If Machine Teaser */}
      <section className="bg-gray-50 py-16 px-6 text-center border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">The What If Machine</h2>
          <div className="bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto">
            <p className="text-gray-700 text-lg mb-4">
              Ever wonder how much faster you'd be debt-free if you skipped that £80 gym membership or cut Friday takeaways?
            </p>
            <p className="text-gray-600 mb-6">
              TrySnowball shows you how small changes lead to big progress. No judgment. Just smart insight.
            </p>
            <button
              onClick={() => onPageChange('what-if')}
              className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition"
            >
              Try It Now
            </button>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-20 px-6 bg-white border-t text-center">
        <h2 className="text-2xl font-semibold mb-6">Be first in line</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Sign up for early access and start your journey to financial freedom.
        </p>
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <input type="hidden" name="form-name" value="signup" />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Join the waitlist
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-8 bg-gray-100 border-t text-gray-500">
        © {new Date().getFullYear()} TrySnowball. Built in the UK with caffeine, clarity, and care.
      </footer>
    </div>
  );
};

// Library Placeholder
const LibraryPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Library</h1>
      <p className="text-gray-600">Coming soon - debt payoff strategies and tips</p>
    </div>
  </div>
);

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'what-if':
        return <WhatIfMachine onPageChange={handlePageChange} />;
      case 'library':
        return <LibraryPage />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;