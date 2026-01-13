'use client'

import { useState } from 'react'
import { Menu, X, Shield, Users, Box, IndianRupee, ShoppingCart, BarChart } from 'lucide-react'

const items = [
  { name: 'User Approvals', icon: Users, active: true },
  { name: 'Inventory', icon: Box, disabled: true },
  { name: 'Pricing & Margins', icon: IndianRupee, disabled: true },
  { name: 'Orders', icon: ShoppingCart, disabled: true },
  { name: 'Analytics', icon: BarChart, disabled: true },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2 text-blue-600 font-bold">
          <Shield size={20} />
          Admin Panel
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className="bg-white min-h-screen border-b shadow-lg">
          <nav className="px-4 py-2 space-y-1">
            {items.map(({ name, icon: Icon, active, disabled }) => (
              <div
                key={name}
                title={disabled ? 'Coming soon' : ''}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                  ${active ? 'bg-blue-50 text-blue-700 font-semibold'
                    : disabled ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Icon size={18} />
                {name}
              </div>
            ))}
          </nav>
        </div>
      )}
      {/* Mobile Topbar */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-col gap-4">
          
          <input
            name="search"
            placeholder="Search users, orders..."
            className="border px-4 py-2 rounded-lg text-sm w-full text-title"
          />
        </div>
      </div>


    </div>
  )
}