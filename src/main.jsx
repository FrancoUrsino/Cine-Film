import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className='dark bg-[#161616]'>
        <App />
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
