import React from 'react'
import UserNavbar from './UserNavbar'

const Userdashboard = () => {
  return (
    <>
    
      <div className="min-h-screen bg-gray-100 pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Main content goes here */}
          <h1 className="text-2xl font-bold mb-4">Welcome to User Dashboard</h1>
          <p className="text-gray-700">This is your dashboard where you can manage your blogs, profile, and more.</p>
        </div>
      </div>
    </>
  )
}

export default Userdashboard