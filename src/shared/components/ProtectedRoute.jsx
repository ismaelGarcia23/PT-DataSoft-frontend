import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../features/auth/context/AuthContext'
import Navbar from './Navbar'

export default function ProtectedRoute() {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  )
}
