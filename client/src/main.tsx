import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  document.body.innerHTML = `
    <div style="
      height:100vh;
      background:#000;
      color:#C9A84C;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:20px;
      font-family:sans-serif;
    ">
      ❌ Root element not found. 
      Check index.html has div id="root"
    </div>
  `
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
