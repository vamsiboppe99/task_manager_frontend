// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.services';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Task List</Link></li>
        <li><Link to="/create">Create Task</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;