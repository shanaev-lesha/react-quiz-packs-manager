import { Box } from '@mui/material'

export const AuthLayout = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </Box>
)