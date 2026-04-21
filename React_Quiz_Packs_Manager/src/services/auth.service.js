import { api } from '../api'

export const getMe = () => api('/auth/me')

export const login = (email, password) => 
   api('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })


export const register = (email, password) => {
  return api('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

