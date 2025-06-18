import React from 'react'
import { Routes, Route } from 'react-router-dom'
import GuestLayout from './Guestlayout'

// Pages
// import BlogPostPage from '../Guestblogpage'
import Register from './Register'
import Login from './Login'
import AdminDashboard from '../Admindashboard'
import ProtectedRoute from './Protectedroute'
import BlogDetail from '../Blogdetail'
import Home from './Home'
import Bloglist2 from './Bloglist2'
import BlogPostPage from './Guestblogdetail'
const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<Home/>} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="blogs" element={<Bloglist2 />} />
        <Route path="blogdetail/:id" element={<BlogPostPage />} />
      </Route>
       {/* Protected Routes */}
     
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default GuestRoutes
