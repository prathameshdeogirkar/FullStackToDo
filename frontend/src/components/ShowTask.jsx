import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loaddToken } from '../utiles.js';

const GetuserTodos = ({ setShowcompo, userId }) => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(loaddToken());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getuserTodos?userId=${userId}`, {
          headers: { authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setTasks(response.data.data);
        } else {
          toast(response.data.message);
        }
      } catch (err) {
        toast('Failed to fetch user tasks');
      }
    };

    if (userId) fetchTasks();
  }, [token, userId]); // Re-fetch when userId changes

  return (
    <div className='h-screen w-full bg-gray-100 p-5 flex flex-col'>
      <h1 className='text-2xl font-bold text-center'>User's Tasks</h1>
      <div className='mt-4 flex flex-col gap-3 overflow-auto'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className='p-3 border border-gray-300 rounded bg-white shadow-md'>
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

export default GetuserTodos;
