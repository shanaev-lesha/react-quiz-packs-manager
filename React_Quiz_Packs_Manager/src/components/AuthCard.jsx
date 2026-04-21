import { Box } from '@mui/material'

export const AuthCard = ({ children }) => (
  <Box
    sx={{
      width: 420,
      p: 4,
      borderRadius: 4,
      background: 'rgba(15,15,15,0.95)',
      border: '1px solid rgba(156,39,176,0.2)',
      boxShadow: `
        0 0 60px rgba(156,39,176,0.25),
        inset 0 0 20px rgba(156,39,176,0.1)
      `,
    }}
  >
    {children}
  </Box>
)