import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppTheme } from './theme/app-theme.tsx'
import { GlobalStyles } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppTheme>
      <GlobalStyles
        styles={{
          body: {
            '--Vinoteca-Background-Dark': 'var(--vinoteca-palette-background-default)',
            '--Vinoteca-Background-Light': 'var(--vinoteca-palette-background-light)',
            '--Vinoteca-Divider': 'var(--vinoteca-palette-divider)',
          }
        }}
      />
      <App />
    </AppTheme>
  </StrictMode>,
)
