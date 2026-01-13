const steps = [
  { step: "01", title: "Register", desc: "Submit basic details & documents" },
  { step: "02", title: "Admin Review", desc: "Verification by admin team" },
  { step: "03", title: "Approval", desc: "Get access to trading features" },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50" id="how">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">
          How Registration Works
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="p-6 bg-white rounded-xl shadow-sm"
            >
              <span className="text-blue-600 font-bold text-xl">
                {s.step}
              </span>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}