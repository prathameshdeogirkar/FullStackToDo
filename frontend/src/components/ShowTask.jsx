import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loaddToken } from '../utiles.js';
import Appbtn from './Appbtn.jsx';

import empty from "./../assets/empty.png"

const API = import.meta.env.VITE_APP_URL

const ShowTodos = ({ setShowcompo, showcomponent }) => {
  const [tasks, setTasks] = useState([]);
  const token = loaddToken(); 

  const [Delete, setDelete] = useState({})

  const fetchTask = async()=>{
    try{
        const response = await axios.get(`${API}/gettodos`, { headers: { Authorization: `Bearer ${token}` } });
        setTasks(response.data.data);
      } catch (error) {
        console.log(error);
    }
  }


useEffect(() => {
  console.log('Component loaded or showcomponent changed');
  fetchTask();
}, [showcomponent]);

useEffect(() => {
  console.log('Component mounted');
  fetchTask();
}, []);


const deleteTask = async (id)=>{
  try {
    const response = await axios.delete(`${API}/deletetodo/${id}`)

    setDelete(response)
  } catch (error) {
    
  }
}
useEffect(() => {
  console.log('Component mounted');
  fetchTask();
}, [Delete]);


  return (
    <div className='h-screen w-[40vw] p-5  overflow-y-scroll overflow-x-hidden'>
      <div className='mt-4 flex flex-col gap-6'>
        {tasks?.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className={`myShadow p-4 ${task.completed ? 'bg-green-300': 'bg-blue-300'}`}>
              <h2 className=' font-serif text-3xl'>{task.title}</h2>
              <p className='text-gray-600'>{task.description}</p>
              <div className='flex gap-4 h-11 my-4 ' >
                <Appbtn 
                veriant='simple_Green' 
                title='Done' 
               />
                <Appbtn
                veriant='simple_Red'
                title='Delete'
                onClick={()=> deleteTask(task._id)}/>
              </div>
            </div>
          ))
        ) : (
          <div className='text-gray-500 text-center h-[70vh]  mx-auto '>
            <img src={empty} alt="empty" className='h-full object-fill' />
            <p className='font-bold '>
              No Task Found, click on date to add new task.
            </p>
          </div>
        )}
      </div>
      <span className='absolute top-3 right-3 text-2xl cursor-pointer' onClick={() => setShowcompo(false)}>
        <i className='ri-close-line'></i>
      </span>
    </div>
  );
};

export default ShowTodos;