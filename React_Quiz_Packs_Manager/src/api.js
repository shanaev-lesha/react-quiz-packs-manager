import { useAuthStore } from './store/auth.store'
export const api = async (url, options = {}) => {
    const token = useAuthStore.getState().token

  const res = await fetch(`http://localhost:3000${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'API error')
  }

  return data
}
