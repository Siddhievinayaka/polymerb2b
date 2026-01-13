export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <span className="inline-block mb-6 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          Trusted B2B Trading Platform
        </span>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
          India's Trusted <br />
          <span className="text-blue-600">Polymer Trading Platform</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Verified buyers and sellers. Transparent pricing.
          Secure, admin-approved transactions.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/register"
            className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-8 py-4 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100"
          >
            Login
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">500+</p>
            <p className="text-sm text-gray-600">Registered Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">120+</p>
            <p className="text-sm text-gray-600">Verified Suppliers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">10K+</p>
            <p className="text-sm text-gray-600">Transactions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">0%</p>
            <p className="text-sm text-gray-600">Downtime</p>
          </div>
        </div>

      </div>
    </section>
  );
}