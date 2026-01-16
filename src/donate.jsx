import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DonatePage from './DonatePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DonatePage />
  </StrictMode>,
)
