import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-blue-400 mb-4">TrySnowball</h1>
        <p className="text-xl mb-2 text-gray-300">Debt is stealing your future.</p>
        <p className="text-2xl font-bold text-white mb-6">Take it back.</p>
        <a href="#signup" className="inline-block mt-4 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
          Join the waitlist
        </a>
      </header>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">What is TrySnowball?</h2>
        <div className="bg-gray-800 rounded-lg p-8 border-l-4 border-blue-500">
          <p className="text-lg leading-relaxed mb-4">
            TrySnowball <span className="text-blue-400 font-semibold">weaponizes</span> the proven debt snowball method to 
            <span className="text-white font-bold"> demolish your debt faster</span> than you thought possible.
          </p>
          <p className="text-gray-300 text-lg">
            <strong className="text-white">Small debts first.</strong> 
            <strong className="text-white"> Momentum builds.</strong> 
            <strong className="text-white"> Freedom follows.</strong>
          </p>
        </div>
      </section>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">The What If Machine</h2>
        <div className="bg-gray-800 rounded-lg p-8 border-l-4 border-blue-500">
          <p className="text-lg leading-relaxed mb-4">
            What if you could <span className="text-blue-400 font-semibold">see your debt-free date</span>? 
            What if that daily coffee habit is <span className="text-white font-semibold">costing you 6 months of freedom</span>? 
            What if an extra £50/month could <span className="text-blue-400 font-semibold">save you thousands</span>?
          </p>
          <p className="text-lg font-bold text-white mb-4">
            Stop wondering. Start seeing.
          </p>
          <p className="text-gray-300">
            Our What If Machine shows you exactly how small changes create massive results—turning 
            <span className="text-blue-400 font-medium"> "what if"</span> into 
            <span className="text-white font-medium"> "when will I be free?"</span>
          </p>
          <a href="#whatif" className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold text-lg">
            See your way out →
          </a>
        </div>
      </section>

     <section id="signup" className="bg-gray-800 rounded-lg shadow-2xl p-8 my-16 max-w-md mx-auto border border-gray-700">
  <h2 className="text-2xl font-bold mb-6 text-center text-white">Be the first to try it</h2>
  <form 
  name="signup" 
  method="POST" 
  data-netlify="true" 
  data-netlify-honeypot="bot-field"
  action="/#signup"
>
    <input type="hidden" name="form-name" value="signup" />
    <p style={{display: 'none'}}>
      <input name="bot-field" />
    </p>
    
    <input
      type="email"
      name="email"
      placeholder="Your email"
      required
      className="w-full p-3 border border-gray-600 rounded-lg mb-4 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
    />
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
    >
      Join the waitlist
    </button>
  </form>
</section>

      <footer className="text-center mt-16 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} TrySnowball. Built in the UK.</p>
      </footer>
    </div>
  );
};

export default Home;