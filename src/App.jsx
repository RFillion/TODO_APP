import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Navigation from './components/navigation'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'

import './style.css'

export default function App() {

  return (
    <div className='h-screen relative'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Navigation />
      </BrowserRouter>
    </div>
  )
}
