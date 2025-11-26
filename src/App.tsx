
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Search from './pages/lead/Search.tsx'
import Plans from './pages/payment/plans.tsx'
import Register from './pages/register/register.tsx'
import Login from './pages/login/login.tsx'
import Lead from './pages/lead/Lead.tsx'
import About from './pages/secondary/about.tsx'
import Devs from './pages/secondary/devs.tsx'
import Graph from './pages/graphs/graph.tsx'
import Account from './pages/account/account.tsx'
import EditAccount from './pages/account/edit.tsx'
import ProtectedRoute from './middlewares/protect-route.tsx'
<<<<<<< HEAD
import Support from './pages/secondary/support.tsx'
=======
import { Thanks } from './pages/thanks/thanks.tsx'
>>>>>>> a2adeb47d2d935859c0eb53d7e950128ac3801a4

function App() {

  return (
    <Routes>
      <Route path="/"element={<Home />}/>
      <Route path='/search'element={<Search/>}/>
      <Route path='/plans'element={<Plans/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/lead/:id" element={<Lead />} />
      <Route path='/about' element={<About/>}/>
      <Route path='/devs' element={<Devs/>}></Route>
      <Route path='/account' element={<Account/>}></Route>
      <Route path='/account/edit' element={<EditAccount/>}></Route>
<<<<<<< HEAD
      <Route path='/support' element={<Support/>}></Route>
=======
      <Route path='/dashboards' element={<Graph/>}></Route>
       <Route path='/success' element={<Thanks/>} ></Route>
>>>>>>> a2adeb47d2d935859c0eb53d7e950128ac3801a4
    </Routes>
  )      
}

export default App
