import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://blogspot-8l4s.onrender.com/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError('Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!user) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-32 px-4">
      {/* Profile Card */}
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg border border-blue-200">
        {/* Heading inside the card */}
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-blue-700">User Profile</h2>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left - Icon */}
          <div className="flex justify-center items-center w-full md:w-1/2 mb-6 md:mb-0">
            <FaUserCircle className="text-blue-600 text-[150px]" />
          </div>

          {/* Right - User Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
            <div>
              <label className="block text-gray-600 font-semibold">Name:</label>
              <p className="text-xl text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Email:</label>
              <p className="text-xl text-gray-900">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
