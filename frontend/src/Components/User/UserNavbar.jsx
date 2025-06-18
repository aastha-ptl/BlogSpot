import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../image/logo2.jpg';

function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#004ba6] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/user">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link to="/user/my-blogs" className="hover:text-gray-300 transition">
              My Blogs
            </Link>
            <Link to="/user/add-blog" className="hover:text-gray-300 transition">
              Add Blog
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-gray-300 transition focus:outline-none"
              >
                User Profile ▾
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg z-50">
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/user/update-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/user/change-password"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Change Password
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="hover:text-gray-300 transition focus:outline-none"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMenu} aria-label="Toggle menu" className="focus:outline-none">
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <Link
            to="/user/my-blogs"
            className="block text-white hover:underline hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            My Blogs
          </Link>
          <Link
            to="/user/add-blog"
            className="block text-white hover:underline hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Add Blog
          </Link>

          {/* Profile Dropdown in Mobile (Optional: direct links instead of dropdown) */}
          <Link
            to="/user/profile"
            className="block text-white hover:underline hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            View Profile
          </Link>
          <Link
            to="/user/update-profile"
            className="block text-white hover:underline hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Update Profile
          </Link>
          <Link
            to="/user/change-password"
            className="block text-white hover:underline hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Change Password
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="block w-full text-left text-white hover:underline hover:text-gray-300 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default UserNavbar;
