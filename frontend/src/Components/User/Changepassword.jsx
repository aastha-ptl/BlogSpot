import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/api/user/change-password',
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.msg);
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      navigate('/user/profile'); 
    } catch (err) {
      setError(err.response?.data?.msg || 'Error updating password');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28 bg-white p-8 rounded shadow-lg border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Change Password
      </h2>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
