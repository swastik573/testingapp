import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './UserManagement.css';  // Add custom CSS

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
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

  const handleDelete = (userId) => {
    if (loggedInUser === userId) {
      alert('You cannot delete your own account.');
      return;
    }

    localStorage.removeItem(userId);
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEdit = (userId) => {
    navigate(`/usermanagement/edit/${userId}`);
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <table className="user-table">
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
                <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
                {loggedInUser !== user.id && (
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
