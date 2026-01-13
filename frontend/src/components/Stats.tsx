const stats = [
  { label: "Registered Users", value: "500+" },
  { label: "Verified Suppliers", value: "120+" },
  { label: "Transactions Processed", value: "10K+" },
  { label: "Platform Downtime", value: "0%" },
];

export default function Stats() {
  return (
    <section className="py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-blue-600">{s.value}</p>
            <p className="text-gray-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}