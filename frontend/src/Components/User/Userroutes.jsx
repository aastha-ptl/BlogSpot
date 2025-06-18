import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../Guest/Protectedroute'
import UserLayout from './UserLayout'
import Home from './User_Home'
import MyBlogs from './MyBlogs'
import AddBlog from './AddBlogs'
import UserProfile from './UserProfile'
import UserDashboard from './Userdashboard'
import Bloglist2 from '../Guest/Bloglist2'
import UpdateProfile from './Updateprofile'
import ChangePassword from './Changepassword'
import UpdateBlog from './Updateblog'
import UserBlogDetail from './Userblogdetail'

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="blogs" element={<Bloglist2 />} />
        <Route path="my-blogs" element={<MyBlogs />} />  
        <Route path="add-blog" element={<AddBlog />} />   
        <Route path="profile" element={<UserProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="updateblog/:id" element={<UpdateBlog />} />
        <Route path="blogdetail/:id" element={<UserBlogDetail />} />
      </Route>
    </Routes>
  )
}

export default UserRoutes
