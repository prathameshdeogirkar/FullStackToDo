import React, { useEffect, useState } from 'react'
import Appinput from './Appinput'
import Appbtn from './Appbtn'
import { toast } from 'react-toastify';
import axios from 'axios';
import {loaddToken} from  "../utiles.js"

const API = import.meta.env.VITE_APP_URL

const Addtask = ({ startdate,setShowcompo }) => {

  const [taskinfo, setTaskinfo] = useState({
    date: startdate,
    title: '',
    description: ''

  })
  
  const [token , setToken] = useState(loaddToken())



  const handleAddtask = async () => {

    console.log(taskinfo)
    try {
      const response = await axios.post(`${API}/addtodo`, { 
        date: taskinfo.date, 
        title: taskinfo.title, 
        description: taskinfo.description
       },  {
        headers: {
          authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json', 
        },
      })

      console.log(response.data)

      if (response.data.success) {
        toast(response?.data.message)
        setShowcompo(false)
      }
      else {
        toast(response?.data.message)
      }

    } catch (err) {
      toast(err)
    }
  }


  return (
    <div className='h-screen w-screen  absolute top-0 left-0 backdrop-blur-sm z-30 flex  items-center justify-center'>
      <div className='h-[70vh] w-[50vw] bg-white   myShadow flex flex-col items-center gap-5 relative'>
        <div className='h-[100%] w-[100%] flex flex-col items-center justify-center '>
          <h1 className='text-4xl font-bold text-center mt-3 mainFont'>Add Task</h1>

          <div className='h-[80%] w-[60%] mt-6  flex flex-col items-center gap-5 bg-'>
            <div className='h-12 w-[100%] '>
              <Appinput placeholder={"Enter task name"}
                value={taskinfo.title}
                onChange={(e) => setTaskinfo({ ...taskinfo, title: e.target.value })}
              />
            </div>
            <div className='h-14 w-[100%]'>
              <Appinput placeholder={"Enter task Description.."}
                value={taskinfo.description}
                onChange={(e) => setTaskinfo({ ...taskinfo, description: e.target.value })}
              />
            </div>
            <div className=' h-12 w-[60%] mt-6 mr-40'>
              <Appbtn title='Add Task'
                veriant='simple_Blue'
                onClick={handleAddtask}
              />
            </div>
          </div>
          <span className='absolute top-1 right-3 text-3xl cursor-pointer' onClick={()=>setShowcompo(false)}><i className="ri-close-line"></i></span>

        </div>



      </div>
    </div>
  )
}

export default Addtask