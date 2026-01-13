'use client'

import { useState, useEffect } from 'react'
import { Shield, Users, Box, IndianRupee, ShoppingCart, BarChart, Menu } from 'lucide-react'

const items = [
  { name: 'User Approvals', icon: Users, active: true },
  { name: 'Inventory', icon: Box, disabled: true },
  { name: 'Pricing & Margins', icon: IndianRupee, disabled: true },
  { name: 'Orders', icon: ShoppingCart, disabled: true },
  { name: 'Analytics', icon: BarChart, disabled: true },
]

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1002
      setIsMobile(mobile)
      if (mobile) setIsCollapsed(true)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <>
      <style jsx>{`
        .sidebar {
          width: ${isCollapsed ? '64px' : '256px'};
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .sidebar-text {
          opacity: ${isCollapsed ? '0' : '1'};
          transform: ${isCollapsed ? 'translateX(-10px)' : 'translateX(0)'};
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          overflow: hidden;
        }
        
        .tooltip {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.2s ease;
          pointer-events: none;
        }
        
        .nav-item:hover .tooltip {
          opacity: ${isCollapsed ? '1' : '0'};
          transform: translateX(0);
        }
      `}</style>
      
      <aside className={`sidebar hidden md:flex flex-col min-h-screen border-r bg-white relative z-10 shadow-sm-side-1`}>
        {/* Toggle Button - Always Visible */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 -right-4 p-2 bg-white cursor-pointer  border rounded-full shadow-md hover:bg-gray-50 transition-colors z-50" style={{top: "25px"}}
        >
          <Menu size={16} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b" style={{marginTop: "23px", paddingBottom: "21px"}}>
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-blue-600 flex-shrink-0" />
            <span className="sidebar-text text-lg font-bold text-blue-600">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {items.map(({ name, icon: Icon, active, disabled }) => (
            <div
              key={name}
              className={`nav-item relative flex items-center h-10 px-3 rounded-lg cursor-pointer transition-all duration-200
                ${active 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="sidebar-text ml-3 text-sm">
                {name}
              </span>
              
              {/* Tooltip */}
              <div className="tooltip absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md z-50">
                {name}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <p className="sidebar-text text-xs text-gray-400">
            Polymer Trading Platform
          </p>
        </div>
      </aside>
    </>
  )
}