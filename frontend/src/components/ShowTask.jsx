import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loaddToken } from '../utiles.js';

const ShowTodos = ({ setShowcompo, showcomponent }) => {
  const [tasks, setTasks] = useState([]);
  const token = loaddToken(); 

  const fetchTask = async()=>{
    try{
        const response = await axios.get('http://localhost:3000/gettodos', { headers: { Authorization: `Bearer ${token}` } });
        setTasks(response.data.data);
        console.log(response.data.data);
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

  return (
    <div className='h-full w-[40vw] p-5 bg-white'>
      <h1 className='text-2xl font-bold text-center'>Your Tasks</h1>
      <div className='mt-4 flex flex-col gap-3 '>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className={`myShadow p-4 ${task.completed ? 'bg-green-300': 'bg-red-300'}`}>
              <h2 className='text-lg font-semibold'>{task.title}</h2>
              <p className='text-gray-600'>{task.description}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center'>No tasks available.</p>
        )}
      </div>
      <span className='absolute top-3 right-3 text-2xl cursor-pointer' onClick={() => setShowcompo(false)}>
        <i className='ri-close-line'></i>
      </span>
    </div>
  );
};

export default ShowTodos;