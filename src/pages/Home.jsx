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
          <p className="text-lg leading-relaxed mb-4 font-semibold">
            Pay off debt faster, with less guesswork.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            TrySnowball helps you see your debt clearly, change your habits, and find hidden money to throw at it.
          </p>
          
          <div className={`${colors.surfaceSecondary} rounded-lg p-6 mb-6 ${colors.border} border`}>
            <h3 className={`text-xl font-bold mb-4 ${colors.text.primary}`}>The Debt Snowball Method (hat tip to Dave Ramsey)</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="font-semibold mb-1">List your debts, smallest to largest</p>
                  <p className="text-sm text-gray-600">Ignore interest rates — focus on balance amounts only</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="font-semibold mb-1">Pay minimums on everything</p>
                  <p className="text-sm text-gray-600">Keep all accounts current and in good standing</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="font-semibold mb-1">Attack the smallest debt with everything extra</p>
                  <p className="text-sm text-gray-600">Every spare pound goes to the smallest balance</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <p className="font-semibold mb-1">Roll payments forward</p>
                  <p className="text-sm text-gray-600">When one's paid off, add that payment to the next smallest debt</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                <div>
                  <p className="font-semibold mb-1">Repeat until debt-free</p>
                  <p className="text-sm text-gray-600">The snowball gets bigger with each debt you eliminate</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className={`${colors.text.secondary} text-lg`}>
            <strong className={colors.text.primary}>Why it works:</strong> Quick wins build momentum. 
            Psychology beats mathematics when it comes to changing behavior.
            <br />
            <strong className={colors.text.primary}>Start small, build momentum, get free.</strong>
          </p>
        </div>
      </section>

      {/* Spend Analyser Section */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary">🔍 AI Spend Analyser</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-primary`}>
          <p className="text-lg leading-relaxed mb-4 font-semibold">
            Where's your money really going?
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Upload your bank transactions — our AI spots hidden spending leaks, fast.
          </p>
          <ul className="mb-4 space-y-2 text-lg">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              <span className="font-semibold text-green-600">£215 average monthly savings found</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              <span>Your data stays private — analysis happens in your browser.</span>
            </li>
          </ul>
          <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex">
            <button
              onClick={() => navigate('/analyser')}
              className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors shadow"
            >
              → Analyse My Spending
            </button>
            <button
              onClick={() => navigate('/analyser')}
              className={`w-full sm:w-auto ${colors.surfaceSecondary} ${colors.text.secondary} px-6 py-3 rounded-lg font-semibold hover:${colors.surface} transition-colors`}
            >
              → Try Demo Data
            </button>
          </div>
        </div>
      </section>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary">🔮 The What If Machine</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-primary`}>
          <p className="text-lg leading-relaxed mb-4 font-semibold">
            Want to see your debt-free date?
          </p>
          <p className="text-lg leading-relaxed mb-4">
            What if you ditched that daily coffee? Paid £50 extra a month?
            <br />
            What if you could see the impact instantly?
          </p>
          <p className={`text-lg font-bold ${colors.text.primary} mb-4`}>
            Stop guessing. Start seeing.
          </p>
          <p className={`${colors.text.secondary} mb-6`}>
            Our What If Machine shows how small changes create big results.
          </p>
          <button 
            onClick={() => navigate('/what-if')}
            className="text-primary hover:text-accent font-semibold text-lg"
          >
            → See Your Way Out
          </button>
        </div>
      </section>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary">💡 AI Debt Coach</h2>
        <div className={`${colors.surface} rounded-lg p-8 border-l-4 border-primary`}>
          <p className="text-lg leading-relaxed mb-4 font-semibold">
            Need a no-BS plan?
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Get a personalised ChatGPT script, a printable worksheet, and a plan ready to load into TrySnowball.
          </p>
          <p className={`${colors.text.secondary} mb-6`}>
            Made for real UK life — credit cards, Klarna, overdrafts and all.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex">
            <button
              onClick={() => navigate('/ai-coach')}
              className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors shadow"
            >
              → Learn More About AI Coach
            </button>
            <a
              href="https://stan.store/trysnowball/p/personal-ai-debt-coach"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block px-6 py-3 bg-transparent border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors shadow text-center"
            >
              → 🛒 Get the AI Coach – £2.99
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

      {/* Purpose Statement */}
      <section className={`${colors.surface} rounded-lg shadow-sm p-8 my-16 max-w-4xl mx-auto ${colors.border} border`}>
        <div className="text-center">
          <p className={`text-lg mb-4 ${colors.text.secondary}`}>
            TrySnowball exists for one reason:
          </p>
          <p className={`text-2xl font-bold mb-4 ${colors.text.primary}`}>
            To help you get out of debt, faster, without shame or gimmicks.
          </p>
          <p className={`text-lg ${colors.text.secondary}`}>
            Because you deserve better than minimum payments.
          </p>
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
            <a 
              href="https://stan.store/trysnowball/p/buy-me-a-coffee-figkm7db" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              ☕ Buy me a Coffee
            </a>
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