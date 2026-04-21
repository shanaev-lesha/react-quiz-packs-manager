import { useEffect } from 'react'
import { useAuthStore } from './store/auth.store'
import { AppRouter } from './router'

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const isLoading = useAuthStore((state) => state.isLoading)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (isLoading) return null // или Loader

  return <AppRouter />
}

export default App



