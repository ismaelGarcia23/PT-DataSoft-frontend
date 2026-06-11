import { useNavigate } from 'react-router-dom'

export default function BookCard({ book }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/books/${book.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col"
    >
      {book.image ? (
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
          <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-medium w-fit mb-2">
          {book.genere?.name}
        </span>
        <h2 className="font-bold text-gray-800 text-base leading-snug mb-1">{book.name}</h2>
        {book.summary && (
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">{book.summary}</p>
        )}
        <p className="text-blue-700 font-bold text-lg mt-3">${book.price}</p>
      </div>
    </div>
  )
}
