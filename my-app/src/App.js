// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import UserManagement from './components/UserManagement';
import Report from './components/Reports';
import CryptoJS from 'crypto-js';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const decryptedUser = CryptoJS.AES.decrypt(localStorage.getItem(localStorage.getItem('loggedInUser')), 'secret-key').toString(CryptoJS.enc.Utf8);
      const user = JSON.parse(decryptedUser);
      console.log(user)

      
      setUserRole(user.type)


      setIsAuthenticated(true);
    }
  }, []);
   console.log(userRole)
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <div style={{ marginLeft: isAuthenticated ? '250px' : '0', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/usermanagement" element={isAuthenticated ? <UserManagement /> : <Navigate to="/" />} />
            {userRole=='admin'&&<Route path="/reports" element={isAuthenticated ? <Report /> : <Navigate to="/" />} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
