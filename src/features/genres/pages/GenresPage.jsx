import { useEffect, useState } from 'react'
import { getGenres, getGenreByName } from '../services/genreService'
import { alertError } from '../../../shared/utils/alerts'
import Pagination from '../../../shared/components/Pagination'
import Spinner from '../../../shared/components/Spinner'

const CARD_COLORS = [
  'from-violet-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-cyan-500 to-sky-600',
  'from-fuchsia-500 to-pink-600',
  'from-lime-500 to-green-600',
]

export default function GenresPage() {
  const [genres, setGenres] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [searching, setSearching] = useState(false)

  const fetchGenres = async (p) => {
    setLoading(true)
    try {
      const data = await getGenres(p, 12)
      setGenres(data.content)
      setTotalPages(data.totalPages)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchGenres(page) }, [page])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search.trim()) return
    setSearching(true)
    try {
      const data = await getGenreByName(search.trim())
      setSearchResult(data)
    } catch {
      alertError('Género no encontrado', `No existe ningún género con el nombre "${search}"`)
    } finally {
      setSearching(false)
    }
  }

  const handleClear = () => {
    setSearchResult(null)
    setSearch('')
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl px-8 py-6 mb-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-1">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h1 className="text-2xl font-bold">Géneros</h1>
        </div>
        <p className="text-violet-100 text-sm">Explorá todos los géneros disponibles</p>
      </div>

      {/* Buscador */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar género por nombre exacto..."
            className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition disabled:opacity-50"
        >
          {searching ? 'Buscando...' : 'Buscar'}
        </button>
        {searchResult && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition"
          >
            Limpiar
          </button>
        )}
      </form>

      {/* Resultado de búsqueda */}
      {searchResult && (
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-3">Resultado de búsqueda:</p>
          <div className="inline-flex items-center gap-4 bg-white border border-violet-200 rounded-2xl px-6 py-4 shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {searchResult.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-800">{searchResult.name}</p>
              <p className="text-xs text-gray-400">ID: {searchResult.id}</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid de géneros */}
      {loading ? <Spinner /> : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {genres.map((g, i) => (
              <div
                key={g.id}
                className={`bg-gradient-to-br ${CARD_COLORS[i % CARD_COLORS.length]} rounded-2xl p-5 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default`}
              >
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center mb-3 text-lg font-bold">
                  {g.name.charAt(0).toUpperCase()}
                </div>
                <p className="font-bold text-base leading-tight">{g.name}</p>
                <p className="text-white/60 text-xs mt-1">ID: {g.id}</p>
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
