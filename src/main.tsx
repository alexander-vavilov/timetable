import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './contexts/UserContext.tsx'
import { ThemeContextProvider } from './contexts/ThemeContext.tsx'

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
