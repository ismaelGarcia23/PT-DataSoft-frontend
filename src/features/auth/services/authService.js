import api from '../../../shared/api/axios'

export const loginService = async (username, password) => {
  const { data } = await api.post('/api/auth/login', { username, password })
  return data
}

export const registerService = async (fullName, username, password) => {
  const { data } = await api.post('/api/auth/register', { fullName, username, password })
  return data
}
