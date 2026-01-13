'use client'

import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api'
import { Clock, Users, ShoppingCart, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { socket } from '@/lib/socket'

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([])
  const [userCount, setUserCount] = useState({ total: 0, buyers: 0, sellers: 0, rejected: 0 })
  const [wsConnected, setWsConnected] = useState(false)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [allUsers, setAllUsers] = useState<any>({ total: 0, buyers: 0, sellers: 0, rejected: 0 })

  useEffect(() => {
    // Load initial data
    apiRequest('/admin/pending-users', 'GET').then(setUsers)
    apiRequest('/admin/users/count', 'GET').then(setUserCount)
    
    // Socket.IO connection
    socket.on('connect', () => {
      setWsConnected(true)
      console.log('Socket.IO connected')
    })
    
    socket.on('pending-user-added', (user) => {
      console.log('Received pending user:', user);
      setUsers(prev => [user, ...prev])
      setNotifications(prev => [{
        id: Date.now(),
        message: `🔔 New ${user.role.toLowerCase()} registered: ${user.email}`,
        time: new Date().toLocaleTimeString(),
        type: 'user'
      }, ...prev.slice(0, 4)])
    })
    
    socket.on('new-order', (order) => {
      setNotifications(prev => [{
        id: Date.now(),
        message: `New order placed: $${order.finalPrice}`,
        time: new Date().toLocaleTimeString(),
        type: 'order'
      }, ...prev.slice(0, 4)])
    })
    
    socket.on('new-feedback', (feedback) => {
      setNotifications(prev => [{
        id: Date.now(),
        message: `New feedback received from ${feedback.userEmail}`,
        time: new Date().toLocaleTimeString(),
        type: 'feedback'
      }, ...prev.slice(0, 4)])
    })
    
    socket.on('disconnect', () => {
      setWsConnected(false)
      console.log('Socket.IO disconnected')
    })
    
    return () => {
      socket.off('pending-user-added')
      socket.off('new-order')
      socket.off('new-feedback')
    }
  }, [])

  async function approve(id: string) {
    await apiRequest(`/admin/approve/${id}`, 'PATCH')
    setUsers(users.filter(u => u.id !== id))
    // Refresh user count after approval
    const updatedCount = await apiRequest('/admin/users/count', 'GET')
    setUserCount(updatedCount)
  }

  async function showUsers() {
    try {
      const stats = await apiRequest('/admin/users/count', 'GET')
      console.log('User stats:', stats)
      setAllUsers(stats)
      setShowUserDialog(true)
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      {/* <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-72 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search users, orders..."
        />
      </div> */}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi title="Pending Approvals" value={users.length} icon={Clock} color="blue" />
        <Kpi title="Total Users" value={userCount.total} icon={Users} color="indigo" onClick={showUsers} />
        <Kpi title="Orders" value="—" icon={ShoppingCart} color="amber" />
        <Kpi 
          title="WebSocket" 
          value={wsConnected ? "Connected" : "Disconnected"} 
          icon={ShieldCheck} 
          color={wsConnected ? "green" : "red"} 
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approvals */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">
          <h2 className="font-semibold mb-4 text-title">Pending User Approvals</h2>

          {users.length === 0 && (
            <p className="text-gray-600 text-sm">No pending approvals</p>
          )}

          <div className="space-y-3">
            {users.map(u => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between gap-3 border rounded-lg p-4"
              >
                <div>
                  <p className="font-medium text-gray-600">{u.email}</p>
                </div>

                <button
                  onClick={() => approve(u.id)}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg"
                >
                  Approve
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Live Notifications */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-title mb-3">Live Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No new notifications</p>
            ) : (
              <div className="space-y-2">
                {notifications.map(notif => (
                  <div key={notif.id} className={`flex items-start gap-3 p-2 rounded-lg ${
                    notif.type === 'user' ? 'bg-blue-50' :
                    notif.type === 'order' ? 'bg-green-50' :
                    'bg-purple-50'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notif.type === 'user' ? 'bg-blue-500' :
                      notif.type === 'order' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-good-health rounded-xl shadow p-5">
            <h3 className="font-semibold text-title">System Health</h3>
            <p className="text-green-600 mt-2 text-sm">All systems operational</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 opacity-60">
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-xs text-gray-500 mt-2">Coming soon</p>
          </div>
        </div>
      </div>

      {/* User Dialog */}
      {showUserDialog && (
        <div className="fixed inset-0 bg-slate-900/55 backdrop-blur-md flex items-center justify-center z-[999] animate-in fade-in duration-200">
          <div className="w-[420px] max-w-[90%] bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18),0_1px_3px_rgba(0,0,0,0.08)] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">User Statistics</h2>
              <button onClick={() => setShowUserDialog(false)} className="text-xl text-slate-500 hover:text-slate-900 bg-transparent border-none cursor-pointer">×</button>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between py-2.5 px-3 bg-slate-50 rounded-[10px] text-slate-700 font-medium">
                <span>Total users</span>
                <span className="text-blue-600 font-semibold">{allUsers.total}</span>
              </div>
              <div className="flex justify-between py-2.5 px-3 bg-slate-50 rounded-[10px] text-slate-700 font-medium">
                <span>Buyers</span>
                <span className="text-blue-600 font-semibold">{allUsers.buyers}</span>
              </div>
              <div className="flex justify-between py-2.5 px-3 bg-slate-50 rounded-[10px] text-slate-700 font-medium">
                <span>Sellers</span>
                <span className="text-blue-600 font-semibold">{allUsers.sellers}</span>
              </div>
              <div className="flex justify-between py-2.5 px-3 bg-slate-50 rounded-[10px] text-slate-700 font-medium">
                <span>Rejected</span>
                <span className="text-blue-600 font-semibold">{allUsers.rejected}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Kpi({ title, value, icon: Icon, color, onClick }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow p-4 flex items-center gap-4 ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
      onClick={onClick}
    >
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        <Icon />
      </div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  )
}