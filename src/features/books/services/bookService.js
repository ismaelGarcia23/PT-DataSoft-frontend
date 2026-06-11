import api from '../../../shared/api/axios'

export const getBooks = async (page = 0, size = 9) => {
  const { data } = await api.get(`/api/books?page=${page}&size=${size}`)
  return data
}

export const getBooksByGenre = async (genreId, page = 0, size = 9) => {
  const { data } = await api.get(`/api/books/genre/${genreId}?page=${page}&size=${size}`)
  return data
}

export const getBookById = async (id) => {
  const { data } = await api.get(`/api/books/${id}`)
  return data
}

export const createBook = async (payload) => {
  const { data } = await api.post('/api/books', payload)
  return data
}

export const updateBook = async (id, payload) => {
  const { data } = await api.put(`/api/books/${id}`, payload)
  return data
}
