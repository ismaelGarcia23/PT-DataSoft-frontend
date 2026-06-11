export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="px-4 py-1.5 bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-300 transition"
      >
        ‹ Anterior
      </button>
      <span className="px-4 py-1.5 text-sm text-gray-600">
        Página {page + 1} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 >= totalPages}
        className="px-4 py-1.5 bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-300 transition"
      >
        Siguiente ›
      </button>
    </div>
  )
}
