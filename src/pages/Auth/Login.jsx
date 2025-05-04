import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/layout/AdminSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with your backend API call
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className='sticky'>
      <DashboardHeader/>
    {/* <AdminSidebar/> */}
    <div className="flex items-center justify-center min-h-[92vh] bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email" placeholder='Enter your Email'
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password" placeholder='Enter your Password'
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p className='flex justify-center'>Not registered? <Link to="/signup" className='underline text-blue-600 cursor-pointer'>Signup</Link></p>

        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
