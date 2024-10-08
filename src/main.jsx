import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react";
import Footer from './components/Footer.jsx'
import { AuthProvider } from './components/DB/AuthContext.jsx'
import { UserProvider } from './components/userProfile/UserContext.jsx'
import HelperBot from './components/ChatBot.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NextUIProvider>
      <AuthProvider>
        <UserProvider>
          <Navbar />
          <main className='dark bg-[#161616]'>
            <App />
          </main>
          <HelperBot />
          <Footer />
        </UserProvider>
      </AuthProvider>
    </NextUIProvider>
  </BrowserRouter>,
)
