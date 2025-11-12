
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Register from './pages/register/register.tsx'
import Login from './pages/login/login.tsx'

function App() {


  return (

    <Routes>
      <Route path="/"element={<Home />}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>}/>
    </Routes>

  )
}

export default App
