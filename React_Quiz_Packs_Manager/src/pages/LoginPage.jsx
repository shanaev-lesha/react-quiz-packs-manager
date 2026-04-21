import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth.service'
import { useAuthStore } from '../store/auth.store'
import { useAuthForm } from '../hooks/useAuthForm'

import { Box, Button, TextField, Typography } from '@mui/material'

export const LoginPage = () => {
  const navigate = useNavigate()

  const loginStore = useAuthStore((state) => state.login)
const {
  email,
  password,
  setEmail,
  setPassword,
  emailError,
  passwordError,
  validate,
  resetErrors,
} = useAuthForm()
  
  const [serverError, setServerError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

if (!validate()) return

    setServerError(null)

    try {
      const data = await login(email, password)
      loginStore(data)
      navigate('/')
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
          background: 'rgba(20,20,20,0.9)',
          boxShadow: '0 0 40px rgba(156, 39, 176, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h4" textAlign="center" mb={1}>
          Login
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          mb={3}
          color="gray"
        >
          Welcome back
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
  setEmail(e.target.value)
  resetErrors()
}}
              error={!!emailError}
              helperText={emailError}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
  setPassword(e.target.value)
  resetErrors()
}}
              error={!!passwordError}
              helperText={passwordError}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 2,
                background:
                  'linear-gradient(90deg, #9c27b0, #ba68c8)',
                '&:hover': {
                  background:
                    'linear-gradient(90deg, #8e24aa, #ab47bc)',
                },
              }}
            >
              LOGIN
            </Button>
          </Box>
        </form>

        {serverError && (
          <Typography color="error" mt={2}>
            {serverError}
          </Typography>
        )}

        <Typography variant="body2" textAlign="center" mt={3}>
          Don’t have an account?{' '}
          <span
            style={{
              color: '#9c27b0',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </Typography>
      </Box>
    </Box>
  )
}

