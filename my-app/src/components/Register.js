import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

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
    type: 'user',
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

    // Validate matching passwords
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    // Validate phone number length
    if (formData.phone.length !== 10) {
      toast.error('Phone number must be 10 digits!');
      return;
    }

    // Encrypt and store data in localStorage
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(formData),
      'secret-key'
    ).toString();
    localStorage.setItem(formData.email, encryptedData);

    toast.success('Registration Successful!');
    setTimeout(() => {
      navigate('/'); // Redirect after registration
    }, 2000);
  };

  return (
    <div className="register-container">
      <ToastContainer /> {/* Toast notification container */}
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
                title="Username should contain only alphabetic characters."
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
                title="First name should contain only alphabetic characters."
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
                title="Last name should contain only alphabetic characters."
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
                title="Phone number should be exactly 10 digits."
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
                title="Enter a valid email address."
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
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])"
                title="Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
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
