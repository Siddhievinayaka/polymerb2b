'use client'

import { useEffect, useState } from 'react'
import { useRealtimeData } from '@/hooks/useRealtimeData'
import { SOCKET_EVENTS } from '@/constants/socketEvents'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [userStatus, setUserStatus] = useState('')
  
  // Real-time status updates
  const realtimeStatus = useRealtimeData(SOCKET_EVENTS.USER_STATUS_UPDATE, '')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const status = localStorage.getItem('userStatus')
    setIsLoggedIn(!!token)
    setUserStatus(status || '')
  }, [])

  // Update status when real-time data changes
  useEffect(() => {
    if (realtimeStatus) {
      setUserStatus(realtimeStatus)
      localStorage.setItem('userStatus', realtimeStatus)
    }
  }, [realtimeStatus])

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold tracking-tight text-gray-900">
          Polymer<span className="text-blue-600">Trade</span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-gray-900">Home</a>
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#why" className="hover:text-gray-900">Why Us</a>
          <a href="#products" className="hover:text-gray-900">Products</a>
          <a href="#shopNow" className="hover:text-gray-900">Shop Now</a>
          <a href="#how" className="hover:text-gray-900">How it works</a>
        </nav>

        {/* Profile Menu and mobile nav toggler */}
        <div className='profile-menu flex'>
          {isLoggedIn && (
            <div className='user-profile-side flex items-center gap-3'>
              <div className={`w-2 h-2 rounded-full ${
                userStatus === 'APPROVED' ? 'bg-green-500' :
                userStatus === 'SUSPENDED' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
              <a href="/user/application-status" className='text-blue-600 hover:text-blue-700'>User</a>
              <button 
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('userStatus')
                  // Disconnect socket on logout
                  import('@/lib/socketManager').then(({ socketManager }) => {
                    socketManager.disconnect()
                  })
                  window.location.href = '/'
                }}
                className='text-red-600 hover:text-red-700 text-sm'
              >
                Logout
              </button>
            </div>
          )}
          <div className='toggler-side md:hidden flex'>
            <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
            </button>
          </div>
        </div>
        {/* Mobile Nav */}
        <div className='md:hidden contents'>
          <div className={`gap-3 nav-side-mob-bar ${isMobileNavOpen ? 'open' : ''}`}>
            <a href="#why" className="hover:text-gray-900">Why Us</a>
            <a href="#products" className="hover:text-gray-900">Products</a>
            <a href="#shopNow" className="hover:text-gray-900">Shop Now</a>

            <a href="#how" className="hover:text-gray-900">How it works</a></div>
        </div>

        {/* Actions */}
        {!isLoggedIn && (
          <div className="flex gap-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </header>
  );
}