
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">TrySnowball</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Pay off debt faster with clarity, motivation, and the power of small decisions.
        </p>
        <a
          href="#signup"
          className="mt-6 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition"
        >
          Join the Waitlist
        </a>
      </header>

      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What You'll Get</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold">📊 Snowball Tracking</h3>
            <p>See your debts shrink over time using the proven Snowball method.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">💡 What If Machine</h3>
            <p>Simulate lifestyle changes — skip a subscription, save £50, and see the impact.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">🔔 Nudges & Coaching</h3>
            <p>Gentle prompts to stay on track and celebrate your wins.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">📚 Honest Insights</h3>
            <p>Read real tips, not financial waffle. Build better habits, not shame.</p>
          </div>
        </div>
      </section>

      <section id="signup" className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Get Early Access</h2>
        <form
          name="signup"
          method="POST"
          data-netlify="true"
          className="max-w-md mx-auto flex flex-col gap-4"
        >
          <input type="hidden" name="form-name" value="signup" />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="px-4 py-3 rounded-md border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Join Now
          </button>
        </form>
      </section>

      <footer className="text-center text-sm py-6 text-gray-500">
        © {new Date().getFullYear()} TrySnowball — Built in the UK with caffeine and courage.
      </footer>
    </div>
  );
}

export default App;
