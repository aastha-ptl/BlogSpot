import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const GuestLayout = () => {
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
      {/* Navbar */}
      <Navbar />

      {/* Main content - full screen height minimum */}
      <main className="min-h-screen container mx-auto px-4 py-4 pt-16">
        <Outlet />
      </main>

      {/* Footer (only scrolls into view after full height) */}
      <Footer />
    </div>
  )
}

export default GuestLayout
