import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBooks, getBooksByGenre } from '../services/bookService'
import { getGenres } from '../../genres/services/genreService'
import BookCard from '../components/BookCard'
import Pagination from '../../../shared/components/Pagination'
import Spinner from '../../../shared/components/Spinner'

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchGenres = async () => {
    const data = await getGenres(0, 100)
    setGenres(data.content)
  }

  const fetchBooks = async (p, genreId) => {
    setLoading(true)
    try {
      const data = genreId
        ? await getBooksByGenre(genreId, p)
        : await getBooks(p)
      setBooks(data.content)
      setTotalPages(data.totalPages)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchGenres() }, [])
  useEffect(() => { fetchBooks(page, selectedGenre) }, [page, selectedGenre])

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value)
    setPage(0)
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-8 py-6 mb-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h1 className="text-2xl font-bold">Libros</h1>
            </div>
            <p className="text-blue-100 text-sm">Explorá el catálogo completo</p>
          </div>
          <Link
            to="/books/create"
            className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-4 py-2.5 rounded-xl text-sm font-bold shadow-md transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo libro
          </Link>
        </div>
      </div>

      {/* Filtro por género */}
      <div className="flex items-center gap-3 mb-6">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white"
        >
          <option value="">Todos los géneros</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        {selectedGenre && (
          <button
            onClick={() => { setSelectedGenre(''); setPage(0) }}
            className="text-sm text-gray-500 hover:text-gray-700 underline transition"
          >
            Limpiar filtro
          </button>
        )}
      </div>

      {/* Grid de libros */}
      {loading ? <Spinner /> : books.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 font-medium">No hay libros para mostrar</p>
          <p className="text-gray-300 text-sm mt-1">Intentá con otro filtro o creá uno nuevo</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
