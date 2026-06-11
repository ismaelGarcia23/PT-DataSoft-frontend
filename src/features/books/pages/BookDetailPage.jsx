import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getBookById } from '../services/bookService'
import Spinner from '../../../shared/components/Spinner'

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    getBookById(id)
      .then(setBook)
      .catch(() => setError(true))
  }, [id])

  if (error) return (
    <div className="text-center py-24">
      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-gray-500 font-medium text-lg mb-2">Libro no encontrado</p>
      <Link to="/books" className="text-blue-600 hover:underline text-sm">← Volver al catálogo</Link>
    </div>
  )

  if (!book) return <Spinner />

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Imagen */}
        {book.image ? (
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="w-full h-72 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <svg className="w-24 h-24 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}

        {/* Info */}
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold mb-3">
                {book.genere?.name}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">{book.name}</h1>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-blue-700">${book.price}</p>
            </div>
          </div>

          {book.summary && (
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Resumen</p>
              <p className="text-gray-600 leading-relaxed">{book.summary}</p>
            </div>
          )}

          {/* Acciones */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
            <Link
              to={`/books/${book.id}/edit`}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar libro
            </Link>
            <Link
              to="/books"
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-bold transition"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
