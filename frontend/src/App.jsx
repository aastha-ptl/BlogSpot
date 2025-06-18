import React from 'react'
import { Routes, Route } from 'react-router-dom'
import GuestRoutes from './Components/Guest/Guestroutes'
import UserRoutes from './Components/User/Userroutes'

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<GuestRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />
    </Routes>
  )
}

export default App
