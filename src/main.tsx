import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />

    <ToastContainer 
        position="bottom-center"      // Posição padrão global
        autoClose={7000}             // Fecha em 5 segundos
        hideProgressBar={false}      
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
    />
    </BrowserRouter>
  </StrictMode>,
)