import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

function TaskForm() {
  const [task, setTask] = useState({ title: '', description: '', completed: false });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`);
    setTask(response.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, task);
    } else {
      await axios.post('http://127.0.0.1:8000/api/tasks/', task);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
      />
      <label>
        Completed:
        <input
          type="checkbox"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{id ? 'Update' : 'Create'} Task</button>
    </form>
  );
}

export default TaskForm;