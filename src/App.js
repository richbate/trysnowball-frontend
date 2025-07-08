import React, { useState } from 'react';
import DebtTracker from './components/DebtTracker';
//import Auth, { useAuth } from './components/auth';
import WhatIfMachine from './pages/WhatIfMachine';

// const user = true;
const loading = false;

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="bg-white text-gray-900">
            {/* Your full homepage code goes here */}
          </div>
        );

      case 'debts':
        return <DebtTracker onPageChange={setCurrentPage} />;

      case 'what-if':
        return <WhatIfMachine onPageChange={setCurrentPage} />;

      case 'books':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Your full books section */}
          </div>
        );

      case 'library':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Your full library section */}
          </div>
        );

      default:
        return <div className="p-10 text-center text-gray-600">Page not found.</div>;
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              TrySnowball
            </button>
            <div className="flex space-x-6">
              {[
                ['home', 'Home'],
                ['what-if', 'What If Machine'],
                ['library', 'Library'],
                ['books', 'Books'],
                ['debts', 'My Debts'],
              ].map(([page, label]) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {renderPage()}
    </div>
  );
}

export default App;