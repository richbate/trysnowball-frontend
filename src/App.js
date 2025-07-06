import React, { useState } from 'react';
import DebtTracker from './components/DebtTracker';
import Auth, { useAuth } from './components/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  const renderPage = () => {
    if (currentPage === 'debts') {
      return <DebtTracker onPageChange={setCurrentPage} />;
    }

    if (currentPage === 'home') {
      return (
        <div className="bg-white text-gray-900">
          {/* Your full homepage code remains here... */}
          {/* About section, What If teaser, Help & Support, Footer */}
        </div>
      );
    }

    if (currentPage === 'what-if') {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🔮 What If Machine</h1>
            <p className="text-xl text-gray-600 mb-8">Coming soon!</p>
            <button 
              onClick={() => setCurrentPage('home')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    if (currentPage === 'books') {
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Your full books section */}
        </div>
      );
    }

    if (currentPage === 'library') {
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Your full library section */}
        </div>
      );
    }

    return <div className="p-10 text-center text-gray-600">Page not found.</div>;
  };

  return (
    <div>
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

      {renderPage()}
    </div>
  );
}

export default App;