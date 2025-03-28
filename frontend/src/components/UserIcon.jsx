import React from 'react'

const UserIcon = () => {
  return (
    <div className='h-12 w-44 bg-purple-300 myShadow absolute right-2 top-0 flex  items-center cursor-pointer overflow-hidden'>
       <div className='h-[40px] w-[40px] ml-2 rounded-full bg-red-400 border-2 border-black'></div>
       <span className='text-xl font-bold ml-2'>{"Sarthak"}</span>
        <i className="ri-arrow-down-s-line"></i>
    </div>
  )
}

export default UserIcon