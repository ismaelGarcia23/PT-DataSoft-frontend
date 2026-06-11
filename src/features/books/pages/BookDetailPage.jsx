import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getBookById } from '../services/bookService'
import { alertToast } from '../../../shared/utils/alerts'
import Spinner from '../../../shared/components/Spinner'

const REVIEWS = [
  {
    id: 1,
    name: 'Carlos Méndez',
    initials: 'CM',
    color: 'from-blue-500 to-indigo-500',
    rating: 5,
    date: 'hace 2 días',
    comment: 'Absolutamente increíble. Una de las mejores lecturas del año, no pude soltarlo hasta terminarlo. Los personajes están muy bien construidos.',
  },
  {
    id: 2,
    name: 'Ana Rodríguez',
    initials: 'AR',
    color: 'from-pink-500 to-rose-500',
    rating: 4,
    date: 'hace 1 semana',
    comment: 'Muy buena historia con personajes bien desarrollados. Le falta un poco más de profundidad en el desenlace, pero en general es excelente.',
  },
  {
    id: 3,
    name: 'Miguel Torres',
    initials: 'MT',
    color: 'from-emerald-500 to-teal-500',
    rating: 5,
    date: 'hace 2 semanas',
    comment: 'Una obra maestra. La narrativa te atrapa desde la primera página. Lo recomiendo sin dudarlo a cualquier amante de la lectura.',
  },
  {
    id: 4,
    name: 'Laura Jiménez',
    initials: 'LJ',
    color: 'from-violet-500 to-purple-500',
    rating: 3,
    date: 'hace 1 mes',
    comment: 'Entretenido pero no excepcional. El inicio es un poco lento pero mejora bastante hacia la mitad del libro.',
  },
  {
    id: 5,
    name: 'Roberto Salinas',
    initials: 'RS',
    color: 'from-orange-500 to-amber-500',
    rating: 4,
    date: 'hace 1 mes',
    comment: 'Muy recomendable. La prosa es elegante y los diálogos suenan muy naturales. Se nota que el autor domina el género.',
  },
]

const RATING_BARS = [
  { stars: 5, pct: 60 },
  { stars: 4, pct: 25 },
  { stars: 3, pct: 10 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 2 },
]

function Stars({ rating, size = 'sm' }) {
  const cls = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`${cls} ${s <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [error, setError] = useState(false)
  const [qty, setQty] = useState(1)
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    getBookById(id)
      .then(setBook)
      .catch(() => setError(true))
  }, [id])

  const handleAddToCart = () => {
    setAdded(true)
    alertToast(`✓ ${qty}x "${book.name}" agregado al carrito`)
    setTimeout(() => setAdded(false), 2500)
  }

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
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Breadcrumb */}
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al catálogo
      </button>

      {/* Card principal */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* Imagen */}
        {book.image ? (
          <img src={book.image} alt={book.name} className="w-full h-72 object-cover" />
        ) : (
          <div className="w-full h-72 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <svg className="w-24 h-24 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Info del libro */}
            <div className="flex-1 space-y-4">
              <div>
                <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold mb-3">
                  {book.genere?.name}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">{book.name}</h1>
              </div>

              {/* Rating visual */}
              <div className="flex items-center gap-2">
                <Stars rating={4} />
                <span className="text-sm text-gray-500">4.4 · <span className="underline cursor-default">21 reseñas</span></span>
              </div>

              {book.summary && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Sinopsis</p>
                  <p className="text-gray-600 leading-relaxed text-sm">{book.summary}</p>
                </div>
              )}

              {/* Botón editar */}
              <div className="pt-2">
                <Link to={`/books/${book.id}/edit`}
                  className="inline-flex items-center gap-2 text-sm text-yellow-600 hover:text-yellow-700 font-semibold transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar este libro
                </Link>
              </div>
            </div>

            {/* Widget carrito */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm">

                {/* Precio */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Precio</p>
                  <p className="text-4xl font-extrabold text-blue-700 mt-0.5">${book.price}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">✓ En stock</p>
                </div>

                {/* Cantidad */}
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-2">Cantidad</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition"
                    >
                      −
                    </button>
                    <span className="text-lg font-bold text-gray-800 w-6 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(q => Math.min(10, q + 1))}
                      className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Botón agregar */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition shadow-md
                    ${added
                      ? 'bg-green-500 text-white shadow-green-200'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg'
                    }`}
                >
                  {added ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Agregado!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Agregar al carrito
                    </>
                  )}
                </button>

                {/* Favorito */}
                <button
                  onClick={() => setLiked(l => !l)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border transition
                    ${liked
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <svg className={`w-4 h-4 transition ${liked ? 'fill-red-500 text-red-500' : 'fill-none'}`}
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {liked ? 'En favoritos' : 'Añadir a favoritos'}
                </button>

                {/* Badges */}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  {[
                    { icon: '🔒', text: 'Pago seguro' },
                    { icon: '🚚', text: 'Envío gratis +$50' },
                    { icon: '↩️', text: 'Devolución en 30 días' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de reseñas */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

        {/* Header reseñas */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Reseñas de lectores</h2>
            <p className="text-sm text-gray-400">21 reseñas verificadas</p>
          </div>
        </div>

        {/* Resumen rating */}
        <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">

          {/* Número grande */}
          <div className="text-center shrink-0">
            <p className="text-6xl font-extrabold text-gray-800">4.4</p>
            <Stars rating={4} size="lg" />
            <p className="text-sm text-gray-400 mt-1">de 5 estrellas</p>
          </div>

          {/* Barras */}
          <div className="flex-1 space-y-2">
            {RATING_BARS.map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-12 text-right shrink-0">{stars} ★</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-8 shrink-0">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de reseñas */}
        <div className="space-y-6">
          {REVIEWS.map((r) => (
            <div key={r.id} className="flex gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">

              {/* Avatar */}
              <div className={`w-10 h-10 shrink-0 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                {r.initials}
              </div>

              {/* Contenido */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                    <Stars rating={r.rating} />
                  </div>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{r.comment}</p>

                {/* Likes en la reseña */}
                <button className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Útil
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA escribir reseña */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-3">¿Ya leíste este libro?</p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Escribir una reseña
          </button>
        </div>
      </div>

    </div>
  )
}
