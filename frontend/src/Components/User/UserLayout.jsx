import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import Footer from '../Guest/Footer'

const UserLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col">
      {/* User Navbar */}
      <UserNavbar />

      {/* Main content */}
      <main className="min-h-screen container mx-auto px-4 py-4 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default UserLayout
