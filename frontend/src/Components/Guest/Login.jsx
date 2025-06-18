import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/user/login', form);

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'user') {
        navigate('/user');
      } else if (user.role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-28 border border-blue-200">
      <h2 className="text-2xl font-bold text-[#005A9C] mb-6 text-center">Login</h2>
      {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
        />

        {/* Password Field with Toggle */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#005A9C] text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Link to Register */}
        <p className="text-sm text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-[#005A9C] font-medium hover:underline">
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
