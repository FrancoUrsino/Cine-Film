import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ItemDetails from './components/home/ItemDetails'
import Cart from './pages/Cart'
import UserSesion from './components/userProfile/UserSesion'
import UserProfile from './pages/UserProfile'
import Sits from './components/cart/Sits'


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/:id' element={<ItemDetails />} />
      <Route path='/promociones' element={ <Cart />} />
      <Route path='/inicio-de-sesion' element={ <UserSesion />} />
      <Route path='/perfil' element={ <UserProfile />} />
      <Route path='/seleccionar-asientos' element={ <Sits />} />
    </Routes>
    </>
  )
}

export default App