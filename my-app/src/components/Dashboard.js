// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const encryptedData = localStorage.getItem(key);

      try {
        // Decrypt the data using the same key as used during encryption
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret-key').toString(CryptoJS.enc.Utf8);
        const userData = JSON.parse(decryptedData);
        allUsers.push(userData);
      } catch (e) {
        console.error('Error decrypting user data', e);
      }
    }
    setUsers(allUsers);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Total Users: {users.length}</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.firstName} {user.lastName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
