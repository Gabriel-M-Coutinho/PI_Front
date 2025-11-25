
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Search from './pages/lead/Search.tsx'
import Register from './pages/register/register.tsx'
import Login from './pages/login/login.tsx'
import Lead from './pages/lead/Lead.tsx'
import About from './pages/secondary/about.tsx'
import Devs from './pages/secondary/devs.tsx'
import Graph from './pages/graphs/graph.tsx'
import Account from './pages/account/account.tsx'
import EditAccount from './pages/account/edit.tsx'
import ProtectedRoute from './middlewares/protect-route.tsx'

function App() {

  return (
    <Routes>
      <Route path="/"element={<Home />}/>
      <Route path='/search'element={<Search/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/lead/:id" element={<Lead />} />
      <Route path='/about' element={<About/>}/>
      <Route path='/devs' element={<Devs/>}></Route>
      <Route path='/dashboards' element={<Graph/>}></Route>
      <Route path='/account' element={<Account/>}></Route>
      <Route path='/account/edit' element={<EditAccount/>}></Route>
    </Routes>
  )      
}

export default App
