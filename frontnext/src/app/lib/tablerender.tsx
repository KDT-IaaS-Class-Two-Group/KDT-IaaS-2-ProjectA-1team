
"use client";

import { useEffect, useState } from 'react';

interface User {
  id: string;
  password: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/users');
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>User List</h1>
      <table style={{
        borderCollapse: 'collapse',
        width: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            <th style={{
              border: '1px solid #ddd',
              padding: '12px 15px',
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#333'
            }}>ID</th>
            <th style={{
              border: '1px solid #ddd',
              padding: '12px 15px',
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#333'
            }}>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ backgroundColor: '#fff' }}>
              <td style={{
                border: '1px solid #ddd',
                padding: '12px 15px'
              }}>{user.id}</td>
              <td style={{
                border: '1px solid #ddd',
                padding: '12px 15px'
              }}>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
