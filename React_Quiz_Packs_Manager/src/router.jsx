import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Dashboard } from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RegisterPage } from './pages/RegisterPage'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
        
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>

    
  )
}