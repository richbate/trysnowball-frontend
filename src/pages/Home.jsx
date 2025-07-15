import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useUserFlow } from '../contexts/UserFlowContext';

const Home = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { startDemo } = useUserFlow();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTryDemo = () => {
    startDemo();
    navigate('/debts');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Submit to Netlify forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'newsletter',
          'email': email
        }).toString()
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={`min-h-screen ${colors.background} ${colors.text.primary} px-6 py-12`}>
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-primary mb-4">TrySnowball</h1>
        <p className={`text-xl mb-2 ${colors.text.secondary}`}>Debt is stealing your future.</p>
        <p className={`text-2xl font-bold ${colors.text.primary} mb-6`}>Take it back.</p>
        <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={handleTryDemo}
            className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors shadow-lg"
          >
            Try Demo
          </button>
        </div>
      </header>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary">What is TrySnowball?</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-primary`}>
          <p className="text-lg leading-relaxed mb-4">
            TrySnowball <span className="text-primary font-semibold">weaponizes</span> the proven debt snowball method to 
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
        <h2 className="text-3xl font-bold mb-6 text-primary">AI Spend Analyser</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-primary`}>
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
              className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors shadow"
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
        <h2 className="text-3xl font-bold mb-6 text-primary">The What If Machine</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-primary`}>
          <p className="text-lg leading-relaxed mb-4">
            What if you could <span className="text-primary font-semibold">see your debt-free date</span>? 
            What if that daily coffee habit is <span className={`${colors.text.primary} font-semibold`}>costing you 6 months of freedom</span>? 
            What if an extra £50/month could <span className="text-primary font-semibold">save you thousands</span>?
          </p>
          <p className={`text-lg font-bold ${colors.text.primary} mb-4`}>
            Stop wondering. Start seeing.
          </p>
          <p className={`${colors.text.secondary} mb-6`}>
            Our What If Machine shows you exactly how small changes create massive results—turning 
            <span className="text-primary font-medium"> "what if"</span> into 
            <span className={`${colors.text.primary} font-medium`}> "when will I be free?"</span>
          </p>
          <button 
            onClick={() => navigate('/what-if')}
            className="text-primary hover:text-accent font-semibold text-lg"
          >
            See your way out →
          </button>
        </div>
      </section>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary">Try the AI Coach</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-primary`}>
          <p className="text-lg leading-relaxed mb-4">
            Want a no-fluff plan to kill your debt? The <span className={`${colors.text.primary} font-semibold`}>TrySnowball AI Debt Coach</span> gives you a
            personalised ChatGPT script, a printable worksheet, and a plan you can load straight into the app.
          </p>
          <p className={`${colors.text.secondary} mb-6`}>
            Designed for real UK life — credit cards, Klarna, overdrafts, and all. It's tough love in digital form.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex">
            <button
              onClick={() => navigate('/ai-coach')}
              className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors shadow"
            >
              Learn More About AI Coach
            </button>
            <a
              href="https://stan.store/trysnowball/p/personal-ai-debt-coach"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block px-6 py-3 bg-transparent border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors shadow text-center"
            >
              🛒 Get the AI Coach – £2.99
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className={`${colors.surface} rounded-lg shadow-2xl p-8 my-16 max-w-md mx-auto ${colors.border} border`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${colors.text.primary}`}>Stay Updated! 📧</h2>
        {isSubmitted ? (
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className={`${colors.text.primary} font-semibold`}>Thanks! We'll keep you updated.</p>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} name="newsletter" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="newsletter" />
            <p className={`text-sm ${colors.text.secondary} mb-4`}>
              Get notified about new features, debt freedom tips, and financial tools.
            </p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className={`w-full p-3 ${colors.border} border rounded-lg mb-4 ${colors.surfaceSecondary} ${colors.text.primary} placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-accent transition-colors font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Get Updates'}
            </button>
          </form>
        )}
      </section>

      {/* Free Tool Messaging */}
      <section className={`${colors.surface} rounded-lg shadow-sm p-8 my-16 max-w-4xl mx-auto ${colors.border} border`}>
        <div className="text-center">
          <h2 className={`text-3xl font-bold mb-4 ${colors.text.primary}`}>Free Financial Freedom Tool</h2>
          <p className={`text-lg mb-6 ${colors.text.secondary}`}>
            TrySnowball is completely free to use. We believe everyone deserves access to powerful debt management tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`${colors.surfaceSecondary} rounded-lg p-4`}>
              <h3 className={`font-semibold mb-2 ${colors.text.primary}`}>Your Data, Your Control</h3>
              <p className={`text-sm ${colors.text.muted}`}>
                All your financial data stays on your device. Download it anytime as a workbook for offline use.
              </p>
            </div>
            <div className={`${colors.surfaceSecondary} rounded-lg p-4`}>
              <h3 className={`font-semibold mb-2 ${colors.text.primary}`}>More Features Coming Soon</h3>
              <p className={`text-sm ${colors.text.muted}`}>
                We're constantly adding new features and improvements. Sign up for updates to stay informed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={`text-center mt-16 text-sm ${colors.text.muted}`}>
        <div className="space-y-4">
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => navigate('/library')} className="hover:text-primary transition-colors">
              Library
            </button>
            <button onClick={() => navigate('/ai-coach')} className="hover:text-primary transition-colors">
              AI Coach
            </button>
            <a 
              href="https://trysnowball.substack.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Newsletter
            </a>
            <button onClick={() => navigate('/analyser')} className="hover:text-primary transition-colors">
              Spend Analyser
            </button>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p>© {new Date().getFullYear()} TrySnowball. Built in the UK.</p>
            <p className="text-xs mt-2">
              Free debt management tools. Your data stays private. Built for UK financial situations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;