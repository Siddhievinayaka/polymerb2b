export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center">
      <h2 className="text-3xl font-bold">
        Ready to Join the Platform?
      </h2>
      <p className="mt-3 text-blue-100">
        Register once. Trade with confidence.
      </p>

      <a
        href="/register"
        className="inline-block mt-8 px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50"
      >
        Get Started
      </a>
    </section>
  );
}