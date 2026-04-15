import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})