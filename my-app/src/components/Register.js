// src/components/Register.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Register.css'; // Ensure CSS is imported

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    type: 'user', // Default value
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Encrypt data before storing
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(formData),
      'secret-key' // Use a secure key in a real application
    ).toString();

    // Store encrypted data in localStorage
    localStorage.setItem(formData.email, encryptedData);

    alert('Registration Successful!');
    navigate('/'); // Redirect to login after successful registration
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Username:</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                pattern="[A-Za-z]+" 
                required 
              />
            </div>
            <div>
              <label>First Name:</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                pattern="[A-Za-z]+" 
                required 
              />
            </div>
          </div>
          <div>
            <div>
              <label>Last Name:</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                pattern="[A-Za-z]+" 
                required 
              />
            </div>
            <div>
              <label>Phone:</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                pattern="\d{10}" 
                required 
              />
            </div>
          </div>
          <div>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
            <label>Type:</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          </div>
          <div>
            <div>
              <label>Password:</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label>Confirm Password:</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div>
              <label>Address:</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                maxLength="300" 
                required 
              />
            </div>
          
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;