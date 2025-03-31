import React, { useState } from 'react';
import { logout , getCurrentUser} from '../utiles';
import userimg from '../assets/user.png' 

const UserIcon = () => {

  const  [showLogout, setShowLogout]= useState(false)
  const handleLogout = () => {
    logout()
  }
 console.log(getCurrentUser());
  return (
    <>
    <div className='h-12 w-44 bg-purple-300 myShadow absolute right-2 top-0 flex  items-center cursor-pointer overflow-hidden' onClick={()=>{
      setShowLogout(!showLogout)
    }}>
       <div className='h-[40px] w-[40px] ml-2 rounded-full bg-black border-2 border-black'>
        <img src={userimg} className='h-full w-full object-cover' ></img>
       </div>
       <span className='text-xl font-bold ml-2'>{getCurrentUser()?.userName }</span>
        <i className="ri-arrow-down-s-line"></i>
    </div>
    {showLogout && <div className='h-12 w-44 bg-red-300 myShadow absolute right-2 top-16 flex  items-center cursor-pointer overflow-hidden justify-center' onClick={handleLogout}>
      <span className='text-xl font-bold ml-2 block '>Logout <i className="ri-logout-box-r-line"></i></span>
    </div>}
    </>
   
  )
}

export default UserIcon