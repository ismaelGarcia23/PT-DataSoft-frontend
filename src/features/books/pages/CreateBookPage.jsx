import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createBook } from '../services/bookService'
import { getGenres } from '../../genres/services/genreService'
import { alertSuccess, alertError } from '../../../shared/utils/alerts'

const emptyForm = { name: '', summary: '', price: '', image: '', genreId: '' }

export default function CreateBookPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    getGenres(0, 100).then((data) => setGenres(data.content))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'image') setImgError(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name: form.name,
        summary: form.summary || null,
        price: parseFloat(form.price),
        image: form.image || null,
        genreId: parseInt(form.genreId),
      }
      const data = await createBook(payload)
      await alertSuccess('¡Libro creado!', `"${data.name}" fue añadido al catálogo.`)
      navigate(`/books/${data.id}`)
    } catch (err) {
      alertError('Error al crear el libro', err.response?.data?.message || 'Intentalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
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

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-8 py-6 mb-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">Nuevo libro</h1>
            <p className="text-blue-100 text-sm">Completá los datos del libro</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nombre <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 7h18M3 12h18M3 17h12" />
                </svg>
              </span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                maxLength={50}
                placeholder="Título del libro"
                className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-300">
                {form.name.length}/50
              </span>
            </div>
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Género <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </span>
              <select
                name="genreId"
                value={form.genreId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
                required
              >
                <option value="">Seleccioná un género</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Precio <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 font-semibold text-sm">
                $
              </span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-xl pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          {/* Resumen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Resumen
              <span className="text-gray-400 font-normal ml-1">(opcional)</span>
            </label>
            <div className="relative">
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="Escribí una breve descripción del libro..."
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
              <span className="absolute bottom-2.5 right-3 text-xs text-gray-300">
                {form.summary.length}/500
              </span>
            </div>
          </div>

          {/* URL de imagen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              URL de imagen
              <span className="text-gray-400 font-normal ml-1">(opcional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {form.image && !imgError && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-40 object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            )}
            {form.image && imgError && (
              <p className="text-xs text-red-400 mt-1.5">La URL no carga una imagen válida.</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 transition shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Crear libro
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-sm transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
