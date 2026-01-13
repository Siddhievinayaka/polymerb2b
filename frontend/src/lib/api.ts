export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

export async function apiRequest(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: any,
) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Unknown error' }))
      const message = errorData.message || `HTTP ${res.status}`
      throw new Error(message)
    }
    
    return res.json()
  } catch (error: any) {
    throw new Error(error.message || 'Network error')
  }
}