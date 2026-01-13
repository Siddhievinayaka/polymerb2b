const categories = [
  "PP Granules",
  "HDPE",
  "LDPE",
  "PVC",
  "PET",
  "ABS",
  "Polystyrene",
  "Custom Polymers",
];

export default function Categories() {
  return (
    <section className="py-20" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">
          Product Categories
        </h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((c) => (
            <div
              key={c}
              className="p-6 border rounded-lg text-center hover:border-blue-600 transition"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}