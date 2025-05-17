import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyles } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Modal } from './components/user/modal.tsx'
import { AppTheme } from './styles/theme/app-theme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppTheme>
        <GlobalStyles
          styles={{
            body: {
              '--Vinoteca-Background-Dark': 'var(--vinoteca-palette-background-default)',
              '--Vinoteca-Background-Light': 'var(--vinoteca-palette-background-light)',
              '--Vinoteca-Divider': 'var(--vinoteca-palette-divider)',
              '--Vinoteca-SideNav-width': '280px',
              '--Vinoteca-SideNav-zIndex': 1100,
              '--Vinoteca-Icon-FontSize-sm': '1rem',
              '--Vinoteca-Icon-FontSize-md': '1.25rem',
              '--Vinoteca-Icon-FontSize-lg': '1.5rem'
            }
          }}
        />
        <Modal/>
        <App />
      </AppTheme>
    </Provider>
  </StrictMode>,
)
