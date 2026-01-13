'use client'

import { useState } from 'react'
import { apiRequest } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'BUYER',
    gst: '',
    pan: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordChecks = [
    { label: 'At least 6 characters', valid: form.password.length >= 6 },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(form.password) },
    { label: 'Contains lowercase letter', valid: /[a-z]/.test(form.password) },
    { label: 'Contains number', valid: /\d/.test(form.password) },
  ]

  async function handleRegister() {
    setLoading(true)
    setErrors([])
    setSuccess('')

    // Validate required fields
    const newErrors = []
    if (!form.email) newErrors.push('Email is required')
    if (!form.password) newErrors.push('Password is required')
    if (!form.gst) newErrors.push('GST number is required')
    if (!form.pan) newErrors.push('PAN number is required')
    if (passwordChecks.some(check => !check.valid)) newErrors.push('Password requirements not met')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    try {
      await apiRequest('/auth/register', 'POST', form)
      setSuccess('Registration successful! Redirecting to login...')
      setTimeout(() => router.push('/login'), 2000)
    } catch (error: any) {
      setErrors([error.message || 'Registration failed'])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            {errors.map((error, i) => (
              <p key={i} className="text-red-600 text-sm">{error}</p>
            ))}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        <input
          type="email"
          placeholder="EMAIL"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <div className="mb-4">
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          
          {/* Password Requirements */}
          {form.password && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Password requirements:</p>
              {passwordChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {check.valid ? (
                    <Check size={12} className="text-green-500" />
                  ) : (
                    <X size={12} className="text-red-500" />
                  )}
                  <span className={check.valid ? 'text-green-600' : 'text-red-600'}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="GST NUMBER"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={form.gst}
          onChange={e => setForm({ ...form, gst: e.target.value })}
        />

        <input
          type="text"
          placeholder="PAN NUMBER"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={form.pan}
          onChange={e => setForm({ ...form, pan: e.target.value })}
        />

        <select
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-medium transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}