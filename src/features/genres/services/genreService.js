import api from '../../../shared/api/axios'

export const getGenres = async (page = 0, size = 10) => {
  const { data } = await api.get(`/api/generes?page=${page}&size=${size}`)
  return data
}

export const getGenreByName = async (name) => {
  const { data } = await api.get(`/api/generes/name?name=${encodeURIComponent(name)}`)
  return data
}
