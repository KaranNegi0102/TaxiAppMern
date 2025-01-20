import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {CaptainDataContext} from '../context/CaptainContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogin = () => {
  const {captain , setCaptain} = useContext(CaptainDataContext);
  console.log("thus is captain=> ",captain);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password
    }

    await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)
    .then((response)=>{
      if(response.status === 200){
        setCaptain(response.data.captain);
        localStorage.setItem("token",response.data.token);
        navigate('/captain-home');
      }
    })

    // setCaptainData({
    //   email: email,
    //   password: password,
    // });
    // console.log(captainData);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Captain Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please login to access your account.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold border hover:bg-gray-200 hover:text-black transition duration-200"
            >
              Login
            </button>
          </div>

          {/* Divider */}
          <div className="text-center text-gray-500 my-4">or</div>

          {/* Back to User Login Link */}
          <div>
            <Link
              to="/login"
              className="w-full block text-center bg-black text-white py-2 px-4 rounded-lg font-semibold border hover:bg-gray-200 hover:text-black transition duration-200"
            >
              Back to User Login
            </Link>
          </div>
        </form>

        {/* Create New Account Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/captain-signup"
              className="font-medium text-indigo-600 hover:text-indigo-700 transition duration-200"
            >
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
