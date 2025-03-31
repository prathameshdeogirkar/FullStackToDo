import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loaddToken } from '../utiles.js';

const ShowTodos = ({ setShowcompo }) => {
  const [tasks, setTasks] = useState([]);
  const token = loaddToken(); // Load user token

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        toast("No token found, please log in");
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/gettodos', {
          headers: { authorization: `Bearer ${token}` },
        });

        console.log(response);

        if (response.data.success) {
          setTasks(response.data.data);
        } else {
          toast(response.data.message);
        }
      } catch (err) {
        toast('Failed to fetch user tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className='h-full w-full p-5 bg-white shadow-md rounded-md'>
      <h1 className='text-2xl font-bold text-center'>Your Tasks</h1>
      <div className='mt-4 flex flex-col gap-3 overflow-auto'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className='p-3 border border-gray-300 rounded bg-gray-50 shadow-sm'>
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
