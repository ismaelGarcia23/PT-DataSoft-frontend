import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './features/auth/context/AuthContext'
import ProtectedRoute from './shared/components/ProtectedRoute'

import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import GenresPage from './features/genres/pages/GenresPage'
import BooksPage from './features/books/pages/BooksPage'
import BookDetailPage from './features/books/pages/BookDetailPage'
import CreateBookPage from './features/books/pages/CreateBookPage'
import EditBookPage from './features/books/pages/EditBookPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/books" replace />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/create" element={<CreateBookPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/books/:id/edit" element={<EditBookPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
