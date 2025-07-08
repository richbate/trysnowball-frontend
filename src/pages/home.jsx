import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">TrySnowball</h1>
        <p className="text-lg">Debt payoff made simple. Make better decisions. Get back in control.</p>
        <a href="#signup" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Join the waitlist
        </a>
      </header>

      <section className="mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">What is TrySnowball?</h2>
        <p>TrySnowball is a debt payoff planner, scenario modeller, and accountability coach—designed to help you clear debt faster and stay motivated.</p>
      </section>

      <section className="mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Coming Soon: The What If Machine</h2>
        <p>Wondering what happens if you skip takeaways for a month or cancel that unused subscription? See how small changes stack up to big progress.</p>
        <a href="#whatif" className="inline-block mt-2 text-blue-600 hover:underline">Preview</a>
      </section>

      <section id="signup" className="bg-white rounded-lg shadow p-6 my-10 max-w-md mx-auto">
  <h2 className="text-xl font-bold mb-4 text-center">Be the first to try it</h2>
  <form name="signup" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="signup" />
    <input
      type="email"
      name="email"
      placeholder="Your email"
      required
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Join the waitlist
    </button>
  </form>
</section>

      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} TrySnowball. Built in the UK.</p>
      </footer>
    </div>
  );
};

export default Home;