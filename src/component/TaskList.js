import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
    setTasks(response.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`);
    fetchTasks();
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Completed' : 'Pending'}
            <Link to={`/edit/${task.id}`}>Edit</Link>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;