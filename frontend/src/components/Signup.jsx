import React from 'react'
import Appbtn from './Appbtn'

const Signup = () => {
  return (
    <div className='w-screen h-screen absolute top-0 left-0 backdrop-blur-md z-30 flex items-center justify-center'>
        <div className='h-10 w-60 myShadow'>
           <Appbtn/>
        </div>
    </div>
  )
}

export default Signup