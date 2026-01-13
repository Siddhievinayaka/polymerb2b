export default function AdminTopbar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <h1 className="text-2xl font-bold text-title">Admin Dashboard</h1>
      <input name="search"
        placeholder="Search users, orders..."
        className="border px-4 py-2 rounded-lg text-sm w-full sm:w-72 text-title"
      />
    </div>
  )
}