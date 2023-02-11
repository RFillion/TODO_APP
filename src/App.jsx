import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { SafeArea } from 'capacitor-plugin-safe-area';

import Login from './pages/logins/login'
import Signup from './pages/logins/signup'
import Home from './pages/Home'

import './style.css'

export default function App() {
  const [safeArea, setSafeArea] = useState(0)
  SafeArea.getStatusBarHeight().then(({statusBarHeight}) => setSafeArea(statusBarHeight))
  return (
    <div
      className='h-screen w-full bg-[#0E131F] text-white transition ease-in' style={{paddingTop: `${safeArea}px`}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
