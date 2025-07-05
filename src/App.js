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
          {/* About Section */}
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
        onClick={() => setCurrentPage('what-if')}
        className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition"
      >
        Try It Now
      </button>
    </div>
  </div>
</section>
          {/* Help & Support Section */}
<section className="bg-blue-50 py-16 px-6 border-t">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
      Need Additional Support?
    </h2>
    <div className="bg-white rounded-lg p-8 shadow-sm border border-blue-200">
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        TrySnowball is a tool to help people find effective ways to clear debt. If you're struggling to repay or feeling overwhelmed, please reach out to any of these registered charities who are well-placed to help. <strong>You are not alone.</strong>
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">StepChange</h3>
          <p className="text-sm text-gray-600 mb-3">Free debt advice charity</p>
          <a 
            href="https://www.stepchange.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            stepchange.org
          </a>
        </div>
        
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Citizens Advice</h3>
          <p className="text-sm text-gray-600 mb-3">Free, confidential advice</p>
          <a 
            href="https://www.citizensadvice.org.uk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            citizensadvice.org.uk
          </a>
        </div>
        
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">National Debtline</h3>
          <p className="text-sm text-gray-600 mb-3">Free debt advice helpline</p>
          <a 
            href="https://www.nationaldebtline.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            nationaldebtline.org
          </a>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Crisis support:</strong> If you're experiencing a mental health crisis, contact <a href="https://www.samaritans.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">Samaritans</a> on <strong>116 123</strong> (free, 24/7)
        </p>
      </div>
    </div>
  </div>
</section>
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
                Books that actually help you take control of your money, mindset, and habits.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Disclosure:</strong> As an Amazon Associate, I earn a little bit from qualifying purchases. These are books I genuinely recommend.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
  
  {/* Rich Dad Poor Dad */}
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <div className="text-center mb-4">
  <img 
    src="https://m.media-amazon.com/images/I/51FZpOlq8lL._SS135_.jpg"
    alt="Rich Dad Poor Dad book cover"
    className="h-32 w-24 mx-auto rounded mb-4 object-cover shadow-sm"
  />
</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
      Rich Dad Poor Dad
    </h3>
    <p className="text-sm text-gray-600 mb-2 text-center">
      by Robert T. Kiyosaki
    </p>
    <p className="text-sm text-gray-700 mb-4">
      The classic that changes how you think about money and assets. Essential reading for anyone wanting to break free from the employee mindset.
    </p>
    <div className="space-y-2 mb-4">
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
        Mindset
      </span>
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Foundation
      </span>
    </div>
      <a href="https://www.amazon.co.uk/dp/B00DO8NUIO?tag=trysnowball-21&linkCode=sl1&linkId=c700aaf68e2ec17135465c578949973b&language=en_GB&ref_=as_li_ss_tl"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-center block text-sm font-medium"
      >
    View on Amazon
    </a>
  </div>

  {/* Psychology of Money */}
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <div className="text-center mb-4">
  <img 
    src="https://m.media-amazon.com/images/I/41oKHACBiZL._SS135_.jpg"
    alt="Unlocking the Psychology of Money book cover"
    className="h-32 w-24 mx-auto rounded mb-4 object-cover shadow-sm"
  />
</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
      Unlocking the Psychology of Money
    </h3>
    <p className="text-sm text-gray-600 mb-2 text-center">
      by Various Authors
    </p>
    <p className="text-sm text-gray-700 mb-4">
      Understand the emotional and psychological forces behind your financial decisions. Perfect for breaking bad money habits and building better ones.
    </p>
    <div className="space-y-2 mb-4">
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
        Psychology
      </span>
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Habits
      </span>
    </div>
    
      <a href="https://www.amazon.co.uk/dp/B0DPFXXTB8?tag=trysnowball-21&linkCode=sl1&linkId=c700aaf68e2ec17135465c578949973b&language=en_GB&ref_=as_li_ss_tl"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-center block text-sm font-medium">
      View on Amazon
    </a>
  </div>

  {/* Debt-Free Living */}
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <div className="text-center mb-4">
  <img 
    src="https://m.media-amazon.com/images/I/41FZhMnQKtL._SS135_.jpg"
    alt="Debt-Free Living In 3 Steps book cover"
    className="h-32 w-24 mx-auto rounded mb-4 object-cover shadow-sm"
  />
</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
      Debt-Free Living In 3 Steps
    </h3>
    <p className="text-sm text-gray-600 mb-2 text-center">
      by Various Authors
    </p>
    <p className="text-sm text-gray-700 mb-4">
      Practical, actionable steps you can implement immediately. Perfect if you want to start seeing results within the first week.
    </p>
    <div className="space-y-2 mb-4">
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
        Debt Payoff
      </span>
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Quick Start
      </span>
    </div>
    
      <a href="https://www.amazon.co.uk/dp/B08HJ5HL75?tag=trysnowball-21&linkCode=sl1&linkId=c700aaf68e2ec17135465c578949973b&language=en_GB&ref_=as_li_ss_tl"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-center block text-sm font-medium">
      View on Amazon
    </a>
    </div>
  {/* Money: A Story of Humanity */}
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
    <div className="text-center mb-4">
  <img 
    src="https://m.media-amazon.com/images/I/71IF-2ZV9YL._AC_UY436_QL65_.jpg"
    alt="Money: A Story of Humanity book cover"
    className="h-32 w-24 mx-auto rounded mb-4 object-cover shadow-sm"
  />
</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
      Money: A Story of Humanity
    </h3>
    <p className="text-sm text-gray-600 mb-2 text-center">
      by David McWilliams
    </p>
    <p className="text-sm text-gray-700 mb-4">
      Understand money's role throughout history and how it shapes our world today. Great for developing a deeper perspective on financial systems.
    </p>
    <div className="space-y-2 mb-4">
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
        Education
      </span>
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        Big Picture
      </span>
    </div>
    
      <a href="https://amzn.to/3Iv21mD"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-center block text-sm font-medium">
      View on Amazon
    </a>
  </div>
</div>

            <div className="text-center">
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
                  Discover the hidden spending leaks that keep you stuck in debt.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-3">
                  Debt
                </span>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  The Minimum Payment Trap
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Why minimum payments are designed to keep you in debt.
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
              <button 
                onClick={() => setCurrentPage('books')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'books' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Books
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