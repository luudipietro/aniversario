import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Aniversario from './pages/main/inicio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Aniversario />
  </StrictMode>,
)
