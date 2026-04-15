import { api } from '../api'

export const login = (email, password) => {
  return api('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}