import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Login.css'; 

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const encryptedUser = localStorage.getItem(email); 
    if (encryptedUser) {
      const decryptedUser = CryptoJS.AES.decrypt(encryptedUser, 'secret-key').toString(CryptoJS.enc.Utf8);
      const user = JSON.parse(decryptedUser);

      if (user.password === password) {
        setIsAuthenticated(true); 
        localStorage.setItem('loggedInUser', email); 
        navigate('/dashboard'); 
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('User not found');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
