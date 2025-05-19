import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyles } from '@mui/material'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.ts'

import { AppTheme } from './styles/theme/app-theme.tsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
          <App />
        </AppTheme>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
