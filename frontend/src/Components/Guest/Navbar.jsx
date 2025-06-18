import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../../image/logo2.jpg'  

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#004ba6] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex space-x-6">
            <Link
              to="/register"
              className=" hover:text-gray-300 transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="hover:text-gray-300 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <Link
            to="/register"
            className="block text-white hover:underline hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
          <Link
            to="/login"
            className="block text-white hover:underline hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
