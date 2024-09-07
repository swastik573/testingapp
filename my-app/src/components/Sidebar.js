// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');


  const handleLogout = (e) => {
    // Prevent default link behavior
    e.preventDefault();
    
    // Show confirmation popup
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
      localStorage.removeItem('loggedInUser');
      
      // Navigate to login page
      window.location.reload()
    }
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const decryptedUser = CryptoJS.AES.decrypt(localStorage.getItem(localStorage.getItem('loggedInUser')), 'secret-key').toString(CryptoJS.enc.Utf8);
      const user = JSON.parse(decryptedUser);

      
      setUserRole(user.type)
    }
  }, []);

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/usermanagement">User Management</Link></li>
        {userRole=='admin'&&<li><Link to="/reports">Reports</Link></li>}
        <li><a href="/login" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
