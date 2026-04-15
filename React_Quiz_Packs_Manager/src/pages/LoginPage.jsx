import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth.service'

import { Box, Button, TextField, Typography } from '@mui/material'

export const LoginPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={400}
      margin="100px auto"
    >
      <Typography variant="h4">Login</Typography>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>

      {error && (
        <Typography color="error">
          {error}
        </Typography>
      )}
    </Box>
  )
}