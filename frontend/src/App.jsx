import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import './App.css'
import AdminLoginPage from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function app() {
  return (
    <>
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Profile' element={<Profile />}/>
        <Route path='/adminLogin' element={<AdminLoginPage />}/>
        <Route path='/adminDashboard' element={<AdminDashboard />}/>
    </Routes>
  </BrowserRouter>  
  </>
  )
}

export default app