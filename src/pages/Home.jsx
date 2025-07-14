import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useUserFlow } from '../contexts/UserFlowContext';
import Auth from '../components/auth';

const Home = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { startDemo, migrateDataToAccount } = useUserFlow();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleTryDemo = () => {
    startDemo();
    navigate('/debts');
  };

  const handleAuthSuccess = async (userData) => {
    await migrateDataToAccount(userData);
    setShowAuthModal(false);
    navigate('/debts');
  };
  return (
    <div className={`min-h-screen ${colors.background} ${colors.text.primary} px-6 py-12`}>
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-blue-500 mb-4">TrySnowball</h1>
        <p className={`text-xl mb-2 ${colors.text.secondary}`}>Debt is stealing your future.</p>
        <p className={`text-2xl font-bold ${colors.text.primary} mb-6`}>Take it back.</p>
        <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={handleTryDemo}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Try Demo (No Account)
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            Create Account
          </button>
        </div>
      </header>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">What is TrySnowball?</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-blue-500`}>
          <p className="text-lg leading-relaxed mb-4">
            TrySnowball <span className="text-blue-500 font-semibold">weaponizes</span> the proven debt snowball method to 
            <span className={`${colors.text.primary} font-bold`}> demolish your debt faster</span> than you thought possible.
          </p>
          <p className={`${colors.text.secondary} text-lg`}>
            <strong className={colors.text.primary}>Small debts first.</strong> 
            <strong className={colors.text.primary}> Momentum builds.</strong> 
            <strong className={colors.text.primary}> Freedom follows.</strong>
          </p>
        </div>
      </section>

      {/* Spend Analyser Section */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">🔍 AI Spend Analyser</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-green-500`}>
          <p className="text-lg leading-relaxed mb-4">
            Upload your bank transactions and discover exactly where your money goes — and where you can save.
          </p>
          <div className={`${colors.surfaceSecondary} rounded-lg p-4 mb-4 ${colors.border} border`}>
            <div className="text-3xl font-bold text-green-500 mb-2">£215</div>
            <p className={`text-sm ${colors.text.muted}`}>Average monthly savings found</p>
          </div>
          <p className={`${colors.text.secondary} mb-6`}>
            Find hidden money for your debt snowball with AI-powered spending analysis. Your data stays private — everything happens in your browser.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex">
            <button
              onClick={() => navigate('/analyser')}
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow"
            >
              Analyse My Spending
            </button>
            <button
              onClick={() => navigate('/analyser')}
              className={`w-full sm:w-auto ${colors.surfaceSecondary} ${colors.text.secondary} px-6 py-3 rounded-lg font-semibold hover:${colors.surface} transition-colors`}
            >
              Try Demo Data
            </button>
          </div>
        </div>
      </section>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">The What If Machine</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-blue-500`}>
          <p className="text-lg leading-relaxed mb-4">
            What if you could <span className="text-blue-500 font-semibold">see your debt-free date</span>? 
            What if that daily coffee habit is <span className={`${colors.text.primary} font-semibold`}>costing you 6 months of freedom</span>? 
            What if an extra £50/month could <span className="text-blue-500 font-semibold">save you thousands</span>?
          </p>
          <p className={`text-lg font-bold ${colors.text.primary} mb-4`}>
            Stop wondering. Start seeing.
          </p>
          <p className={`${colors.text.secondary} mb-6`}>
            Our What If Machine shows you exactly how small changes create massive results—turning 
            <span className="text-blue-500 font-medium"> "what if"</span> into 
            <span className={`${colors.text.primary} font-medium`}> "when will I be free?"</span>
          </p>
          <button 
            onClick={() => navigate('/what-if')}
            className="text-blue-500 hover:text-blue-400 font-semibold text-lg"
          >
            See your way out →
          </button>
        </div>
      </section>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">Try the AI Coach</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-blue-500`}>
          <p className="text-lg leading-relaxed mb-4">
            Want a no-fluff plan to kill your debt? The <span className={`${colors.text.primary} font-semibold`}>TrySnowball AI Debt Coach</span> gives you a
            personalised ChatGPT script, a printable worksheet, and a plan you can load straight into the app.
          </p>
          <p className={`${colors.text.secondary} mb-6`}>
            Designed for real UK life — credit cards, Klarna, overdrafts, and all. It's tough love in digital form.
          </p>
          <a
            href="https://stan.store/trysnowball/p/personal-ai-debt-coach"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow"
          >
            🛒 Get the AI Coach – £2.99
          </a>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute -top-2 -right-2 z-10 bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                ×
              </button>
              <Auth onAuthSuccess={handleAuthSuccess} />
            </div>
          </div>
        </div>
      )}

      <footer className={`text-center mt-16 text-sm ${colors.text.muted}`}>
        <p>© {new Date().getFullYear()} TrySnowball. Built in the UK.</p>
      </footer>
    </div>
  );
};

export default Home;