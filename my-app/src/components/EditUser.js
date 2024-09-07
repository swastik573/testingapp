import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './EditUser.css';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    mobile: '',
    email: '',
    firstName: '',
    lastName: '',
    type: ''
  });

  useEffect(() => {
    const encryptedData = localStorage.getItem(userId);
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret-key').toString(CryptoJS.enc.Utf8);
    const user = JSON.parse(decryptedData);
    setFormData(user);
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(formData), 'secret-key').toString();
    localStorage.setItem(userId, encryptedData);
    navigate('/usermanagement');
  };

  return (
    <div className="edit-user-container" style={{width:'40%' , margin:'auto'}}>
      <h2>Edit User</h2>
      <form className="edit-user-form" onSubmit={handleSave}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleInputChange} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditUser;
