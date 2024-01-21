import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import { ThemeContextProvider } from './contexts/ThemeContext.tsx'
import { UserContextProvider } from './contexts/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
