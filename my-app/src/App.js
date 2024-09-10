import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import UserManagement from './components/UserManagement';
import Report from './components/Reports';
import CryptoJS from 'crypto-js';
import EditUser from './components/EditUser';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const decryptedUser = CryptoJS.AES.decrypt(localStorage.getItem(loggedInUser), 'secret-key').toString(CryptoJS.enc.Utf8);
      const user = JSON.parse(decryptedUser);
      console.log(user);
      
      setUserRole(user.type);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/dashboard" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/" />} />
        <Route path="/usermanagement" element={isAuthenticated ? <Layout><UserManagement /></Layout> : <Navigate to="/" />} />
        <Route path="/usermanagement/edit/:userId" element={isAuthenticated ? <EditUser /> : <Navigate to="/" />} />
        {userRole === 'admin' && <Route path="/reports" element={isAuthenticated ? <Layout><Report /></Layout> : <Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};

export default App;
