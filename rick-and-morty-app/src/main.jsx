import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RickMortyApp } from './RickMortyApp.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RickMortyApp />
  </StrictMode>,
)
