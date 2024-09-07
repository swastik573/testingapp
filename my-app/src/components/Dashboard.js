import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Register these components
import './Dashboard.css';

// Register the ArcElement, Tooltip, and Legend from Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [userTypeCounts, setUserTypeCounts] = useState({ user: 0, admin: 0 });

  useEffect(() => {
    const allUsers = [];
    let userCount = 0;
    let adminCount = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const encryptedData = localStorage.getItem(key);

      try {
        // Decrypt the data using the same key as used during encryption
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret-key').toString(CryptoJS.enc.Utf8);
        const userData = JSON.parse(decryptedData);
        allUsers.push(userData);

        // Count user types for the pie chart
        if (userData.type === 'admin') {
          adminCount++;
        } else {
          userCount++;
        }
      } catch (e) {
        console.error('Error decrypting user data', e);
      }
    }

    setUsers(allUsers);
    setUserTypeCounts({ user: userCount, admin: adminCount });
  }, []);

  // Data for the pie chart
  const chartData = {
    labels: ['Users', 'Admins'],
    datasets: [
      {
        label: 'User Distribution',
        data: [userTypeCounts.user, userTypeCounts.admin],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <h3>Total Users: {users.length}</h3>
      </div>

      <div className="dashboard-content">
        <div className="user-list">
          <h4>User List</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.firstName} {user.lastName} ({user.type})
              </li>
            ))}
          </ul>
        </div>

        <div className="user-chart" style={{width:'30%',height:'30%'}}>
          <h4>User Type Distribution</h4>
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
