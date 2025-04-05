import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appinput from './Appinput';
import Appbtn from './Appbtn';

const API = import.meta.env.VITE_APP_URL

const Login = ({setShowcompo,setAuthComp}) => {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async ()=>{
    console.log(email, password)
     try {
        let  response = await axios.post(`${API}/login`,{
          email,
          password
        })

        console.log(response.data)

        if(!response.data?.status){
           toast(response.data?.message)
        }
        else{
          toast(response.data?.message)
          localStorage.setItem('allInfo',JSON.stringify(response.data?.data))
          setShowcompo(false)
          setAuthComp(false)
          window.location.reload()
        }
     } catch (error) {
     }
  }

  return (
    <div className='h-screen w-screen absolute top-0 left-0 backdrop-blur-2xl z-30 flex items-center justify-center'>
      <div className='w-[80%] h-[70%] bg-white mx-auto myShadow flex'>

        {/* Left Section (Login Form) */}
        <div className='h-full w-full md:w-[80%] flex flex-col items-center gap-6'>
          <h1 className='text-4xl font-bold text-center mt-3 mainFont'>Login</h1>

          <div className='h-14 w-[70%]'>
            <Appinput name="userName" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>

          <div className='h-14 w-[70%]'>
            <Appinput name="password" type="password" placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>

          <div className='h-14 w-[70%]'>
            <Appbtn title='Log In' veriant='simple_Yellow' onClick={handleLogin} />
          </div>

          <span className='flex items-start text-sm sm:text-xl text-gray-600 cursor-pointer w-[70%] block' onClick={()=>{setShowcompo(true)}}>
            Don't Have an Account?
            <span className='text-blue-600 block ml-2 cursor-pointer'>
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
