import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DebtTracker from './pages/MyDebtsPage';
//import Auth, { useAuth } from './components/auth';
import WhatIfMachine from './pages/WhatIfMachine';
import Home from './pages/Home';
import Library from './pages/Library';
import SpendAnalyser from './components/SpendAnalyser';

// const user = true;
const loading = false;

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // if (!user) {
  //  return <Auth onAuthSuccess={() => {}} />;
  //}

  // Navigation items with emojis for better UX
  const navItems = [
    ['/', '🏠 Home'],
    ['/analyser', '🔍 Spend Analyser'],
    ['/what-if', '🚀 What If Machine'],
    ['/debts', '🎯 My Debts'],
    ['/library', '📚 Library'],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <Link 
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>TrySnowball</span>
              <span className="text-sm text-gray-500 font-normal">Debt Freedom Tool</span>
            </Link>

            {/* Navigation Items */}
            <div className="hidden md:flex space-x-1">
              {navItems.map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === path
                      ? 'bg-blue-600 text-white shadow-sm transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-2">
              <div className="flex flex-col space-y-1">
                {navItems.map(([path, label]) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => {
                      setIsMenuOpen(false); // Close menu when clicked
                    }}
                    className={`px-4 py-2 text-left rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === path
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <div className="transition-all duration-300 ease-in-out">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyser" element={<SpendAnalyser />} />
          <Route path="/what-if" element={<WhatIfMachine />} />
          <Route path="/debts" element={<DebtTracker />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>🔒 All your financial data stays private on your device</p>
            <p className="mt-2">Built to help you become debt-free faster with the snowball method</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;