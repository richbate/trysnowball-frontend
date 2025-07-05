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
            <button   onClick={() => setCurrentPage('books')}
  className={`px-3 py-2 rounded-md text-sm font-medium ${
    currentPage === 'books' 
      ? 'bg-blue-100 text-blue-700' 
      : 'text-gray-600 hover:text-gray-900'
  }`}
>
  Books
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
if (currentPage === 'books') {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📚 Recommended Books</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Books that actually help you take control of your money, mindset, and habits — no get-rich-quick schemes or complicated theories.
          </p>
        </div>

        {/* Disclosure */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-sm text-blue-800">
            <strong>Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. These are books I genuinely recommend for building financial knowledge and habits.
          </p>
        </div>

        {/* Books Grid - You'll populate this */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          
          {/* Example Book Card - Replace with your actual books */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
            <div className="text-center mb-4">
              <div className="bg-gray-100 h-32 w-24 mx-auto rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Book Cover</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
              Book Title Here
            </h3>
            <p className="text-sm text-gray-600 mb-2 text-center">
              by Author Name
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Brief description of why this book is valuable for debt payoff and financial freedom.
            </p>
            <div className="space-y-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                Debt Payoff
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Beginner Friendly
              </span>
            </div>
            
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-center block text-sm font-medium"
            >
              View on Amazon
            </a>
          </div>

          {/* Add more book cards here */}
          
        </div>

        {/* Reading Tips Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Get the Most from These Books</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Reading Strategy</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Start with one book that addresses your biggest challenge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Take notes on 3-5 key takeaways per chapter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Apply one concept before moving to the next chapter</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Implementation</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Don't wait until you finish to start implementing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Re-read the best books - they reveal new insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Share what you learn to reinforce the concepts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Take Action?</h2>
          <p className="text-lg mb-6 opacity-90">
            Reading is great, but doing is better. Try our tools to put these strategies into practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('what-if')}
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Try the What If Machine
            </button>
            <button
              onClick={() => setCurrentPage('library')}
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Read Our Articles
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
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
            <div className="grid gap-6 md:grid-cols-2 mb-12">
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
      Spending
    </span>
    <h2 className="text-xl font-semibold text-gray-900 mb-3">
      Where Does Your Money Actually Go?
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      Discover the hidden spending leaks that keep you stuck in debt — and the simple fixes that free up hundreds each month.
    </p>
  </div>

  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
      Spending
    </span>
    <h2 className="text-xl font-semibold text-gray-900 mb-3">
      The No-Shame Spending Audit
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      A guilt-free way to review your expenses and spot opportunities without beating yourself up.
    </p>
  </div>

  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">
      Strategy
    </span>
    <h2 className="text-xl font-semibold text-gray-900 mb-3">
      Emergency Fund vs. Debt Payoff: Which Comes First?
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      The counter-intuitive truth about why saving while in debt might be costing you thousands.
    </p>
  </div>

  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">
      Strategy
    </span>
    <h2 className="text-xl font-semibold text-gray-900 mb-3">
      Found Money: 12 Tiny Changes That Add Up Big
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      From subscription audits to grocery hacks — every pound you find is a pound toward freedom.
    </p>
  </div>

  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-3">
      Debt
    </span>
    <h2 className="text-xl font-semibold text-gray-900 mb-3">
      Snowball vs. Avalanche: Why Psychology Beats Math
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      The mathematically optimal method isn't always the best. Here's how to choose the strategy that actually works for you.
    </p>
  </div>

  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-3">
      Debt
    </span>
    <h2 className="text-xl font-semibold text-gray-900 mb-3">
      The Minimum Payment Trap — And How to Escape It
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      Why minimum payments are designed to keep you in debt, and what to do instead.
    </p>
  </div>

  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-3">
      Debt
    </span>
    <h2 className="text-xl font-semibold text-gray-900 mb-3">
      How Compound Interest Becomes Your Worst Enemy
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      The hidden force that makes your debt grow faster than you think — and how to turn it around.
    </p>
  </div>

  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-3">
      Mindset
    </span>
    <h2 className="text-xl font-semibold text-gray-900 mb-3">
      Breaking Free from Debt Shame
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      Why guilt keeps you stuck and how to replace shame with actionable steps toward financial freedom.
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