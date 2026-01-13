const features = [
  {
    title: "Verified Participants",
    desc: "All buyers & sellers are manually reviewed by admins.",
  },
  {
    title: "Transparent Pricing",
    desc: "Live pricing with margin clarity.",
  },
  {
    title: "Secure Transactions",
    desc: "Approval-based access ensures trusted trading.",
  },
  {
    title: "Industry Focused",
    desc: "Built exclusively for polymer trading.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-gray-50" id="why">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">
          Why Industry Leaders Trust Us
        </h2>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}