// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    mobile: '',
    email: '',
    firstName: '',
    lastName: '',
    type: ''
  });
  const loggedInUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    // Fetch users from localStorage
    const allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const encryptedData = localStorage.getItem(key);
      try {
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret-key').toString(CryptoJS.enc.Utf8);
        const userData = JSON.parse(decryptedData);
        allUsers.push({ ...userData, id: key }); // Use key as unique ID
      } catch (e) {
        console.error('Error decrypting user data', e);
      }
    }
    setUsers(allUsers);
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user });
    // window.location.href = `/usermanagement`;
  };

  const handleDelete = (userId) => {
    if (loggedInUser === userId) {
      alert('You cannot delete your own account.');
      return;
    }

    localStorage.removeItem(userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSave = () => {
    const { id, ...updatedData } = formData;
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(updatedData), 'secret-key').toString();
    localStorage.setItem(id, encryptedData);

    setUsers(users.map(user => (user.id === id ? { ...updatedData, id } : user)));
    setEditingUser(null);
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.address}</td>
              <td>{user.mobile}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.type}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                {loggedInUser !== user.id && (
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); window.location.href = `/usermanagement`;}}>
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
                <option value="">Select</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
