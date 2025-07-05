import React, { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    if (currentPage === 'home') {
      return (
        <div className="bg-white text-gray-900">
          <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 px-6 text-center shadow-lg">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">TrySnowball</h1>
            <p className="text-xl max-w-2xl mx-auto mb-6 opacity-90">
              Smash your debt with smart tools, clear insight, and a dose of momentum.
            </p>
            <p className="text-md max-w-xl mx-auto mb-8 opacity-80">
              Make better decisions. Get back in control.
            </p>
            <button 
              onClick={() => setCurrentPage('what-if')}
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-100 transition"
            >
              Try the What If Machine
            </button>
          </header>
          <footer className="text-center text-sm py-8 bg-gray-100 border-t text-gray-500">
            © {new Date().getFullYear()} TrySnowball. Built in the UK with caffeine, clarity, and care.
          </footer>
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

    if (currentPage === 'library') {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">📖 Library</h1>
              <p className="text-xl text-gray-600">
                Master your money. No lectures, no jargon — just real strategies that work.
              </p>
            </div>
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                  Spending
                </span>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Where Does Your Money Actually Go?
                </h2>
                <p className="text-gray-600 text-sm">
                  Discover the hidden spending leaks that keep you stuck in debt.
                </p>
              </div>
            </div>
            <div className="text-center">
              <button 
                onClick={() => setCurrentPage('home')}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    }
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
              <button 
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'home' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('what-if')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'what-if' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                What If Machine
              </button>
              <button 
                onClick={() => setCurrentPage('library')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'library' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Library
              </button>
            </div>
          </div>
        </div>
      </nav>

      {renderPage()}
    </div>
  );
}

export default App;