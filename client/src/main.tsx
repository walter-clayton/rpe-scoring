import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App.tsx'
import './index.css'

// One dark theme for every screen, so dialogs and toasts match the black page.
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#000', paper: '#141414' },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
