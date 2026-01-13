import AdminSidebar from '@/components/admin/AdminSidebar'
import MobileNav from '@/components/admin/MobileNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Navigation - Sticky */}
      <div className="sticky top-0 z-50">
        <MobileNav />
      </div>
      
      <div className="flex h-screen">
        {/* Sidebar - Sticky */}
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Topbar - Sticky */}
          <div className="sticky top-0 z-40 hidden md:flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-6 pb-4 bg-white shadow-sm-1 border-b">
            <h1 className="text-2xl font-bold text-title">Admin Dashboard</h1>
            <input
              name="search"
              placeholder="Search users, orders..."
              className="border px-4 py-2 rounded-lg text-sm w-full sm:w-72 text-title"
            />
          </div>
          
          {/* Scrollable Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-scroll bg-slate-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}