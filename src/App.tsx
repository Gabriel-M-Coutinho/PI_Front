
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Register from './pages/register/register.tsx'
import Login from './pages/login/login.tsx'
import Lead from './pages/lead/Lead.tsx'
import About from './pages/secondary/about.tsx'
import Devs from './pages/secondary/devs.tsx'
import Graph from './pages/graphs/graph.tsx'
import ProtectedRoute from './middlewares/protect-route.tsx'
import { Thanks } from './pages/thanks/thanks.tsx'

function App() {

  return (
    <Routes>
      <Route path="/"element={<Home />}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/lead/:id" element={<Lead />} />
      <Route path='/about' element={<About/>}/>
      <Route path='/devs' element={<Devs/>}></Route>
      <Route path='/dashboards' element={
        <ProtectedRoute>   <Graph/></ProtectedRoute>
        
     }></Route>
     <Route path='/success' element={<Thanks/>} ></Route>
    </Routes>
  )
}

export default App
