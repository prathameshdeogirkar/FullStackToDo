import React from 'react'
import Appinput from './Appinput'
import Appbtn from './Appbtn'

const Addtask = () => {
    return (
        <div className='h-screen w-screen  absolute top-0 left-0 backdrop-blur-sm z-30 flex  items-center justify-center'>
         <div className='h-[70vh] w-[50vw] bg-white   myShadow flex flex-col items-center gap-5 relative'>
           <div className='h-[100%] w-[100%] flex flex-col items-center justify-center '>
                <h1 className='text-4xl font-bold text-center mt-3 mainFont'>Add Task</h1>

               <div className='h-[80%] w-[60%] mt-6  flex flex-col items-center gap-5 bg-'>
               <div className='h-12 w-[100%] '> <Appinput placeholder={"Enter task name"} /></div>
               <div className='h-14 w-[100%]'> <Appinput placeholder={"Enter task Description.."} /></div>
               <div className=' h-12 w-[60%] mt-6 mr-40'>
                 <Appbtn title='Add Task' veriant='simple_Blue' />
                 </div>
               </div>
               <span className='absolute top-1 right-3 text-3xl'><i class="ri-close-line"></i></span>
               
           </div>
              


         </div>
        </div>
    )
}

export default Addtask