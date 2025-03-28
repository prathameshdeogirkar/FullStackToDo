import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appinput from './Appinput';
import Appbtn from './Appbtn';

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleLogin = async () => {
    if (!formData.userName || !formData.email || !formData.password) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log('Login Successful:', response.data);

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      toast.success('Login Successful!');
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='h-screen w-screen absolute top-0 left-0 backdrop-blur-2xl z-30 flex items-center justify-center'>
      <div className='w-[80%] h-[70%] bg-white mx-auto myShadow flex'>

        {/* Left Section (Login Form) */}
        <div className='h-full w-full md:w-[80%] flex flex-col items-center gap-6'>
          <h1 className='text-4xl font-bold text-center mt-3 mainFont'>Login</h1>

          <div className='h-14 w-[70%]'>
            <Appinput name="userName" placeholder="Enter username" onChange={(e)=>handleChange(e)} />
          </div>

          <div className='h-14 w-[70%]'>
            <Appinput name="password" type="password" placeholder="Enter password" onChange={(e)=>handleChange(e)} />
          </div>

          <div className='h-14 w-[70%]'>
            <Appbtn title='Log In' veriant='simple_Yellow' onClick={handleLogin} />
          </div>

          <span className='flex items-start text-sm sm:text-xl text-gray-600 cursor-pointer w-[70%] block'>
            Don't Have an Account?
            <span className='text-blue-600 block ml-2 cursor-pointer' onClick={() => navigate('/signup')}>
              Sign Up <i className="ri-arrow-right-line"></i>
            </span>
          </span>
        </div>

        {/* Right Section (Design) */}
        <div className='bg-purple-400 h-full w-1/2 hidden md:flex md:flex-col md:items-center md:justify-center'>
          <span className='text-6xl font-bold block w-full text-center text-white'>Strategize</span>
          <span className='text-5xl font-bold block w-full text-right mr-20'>Week</span>
          <span className='text-7xl font-bold block w-full text-center text-yellow-400'>Achieve</span>
          <span className='text-5xl font-bold block w-full text-right mr-20'>Goal</span>
        </div>

      </div>
    </div>
  );
};

export default Login;
