import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/context/AuthContext'
import { alertConfirm } from '../utils/alerts'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await alertConfirm('¿Cerrar sesión?', '¿Estás seguro de que quieres salir?')
    if (result.isConfirmed) {
      logout()
      navigate('/login')
    }
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="flex gap-6">
        <Link to="/books" className="text-sm font-medium hover:text-blue-400 transition">
          Libros
        </Link>
        <Link to="/genres" className="text-sm font-medium hover:text-blue-400 transition">
          Géneros
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">
          Hola, <span className="text-white font-medium">{user?.fullName}</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}
