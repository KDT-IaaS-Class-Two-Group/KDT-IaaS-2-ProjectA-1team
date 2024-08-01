"use client";

import { useEffect, useState } from 'react';

interface User {
  id: string;
  password: string;
  [key: string]: any; // 추가적인 열을 위한 유연한 타입 정의
}

const Tablerender = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [columnName, setColumnName] = useState<string>('');
  const [deleteColumnName, setDeleteColumnName] = useState<string>(''); // 삭제할 열 이름을 저장

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8080/users');
      const data: User[] = await res.json();
      console.log('Fetched data:', data); // 데이터 확인을 위한 콘솔 로그
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addColumn = async () => {
    if (!columnName) {
      alert('Column name must be provided.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/add-column/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ column_name: columnName }),
      });

      if (res.ok) {
        console.log('Column added successfully'); // 성공 메시지 확인
        setColumnName(''); // 입력 필드 초기화
        fetchData(); // 데이터를 다시 가져와 업데이트
      } else {
        console.error('Failed to add column:', res.statusText);
      }
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const deleteColumn = async () => {
    if (!deleteColumnName) {
      alert('Column name must be provided.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/delete-column/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ column_name: deleteColumnName }),
      });

      if (res.ok) {
        console.log('Column deleted successfully'); // 성공 메시지 확인
        setDeleteColumnName(''); // 입력 필드 초기화
        fetchData(); // 데이터를 다시 가져와 업데이트
      } else {
        console.error('Failed to delete column:', res.statusText);
      }
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User List</h1>
      <input
        type="text"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        placeholder="Enter new column name"
      />
      <button onClick={addColumn}>Add Column</button>
      <br />
      <input
        type="text"
        value={deleteColumnName}
        onChange={(e) => setDeleteColumnName(e.target.value)}
        placeholder="Enter column name to delete"
      />
      <button onClick={deleteColumn}>Delete Column</button>
      <table style={{
        borderCollapse: 'collapse',
        width: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            {users.length > 0 && Object.keys(users[0]).map(key => (
              <th key={key} style={{
                border: '1px solid #ddd',
                padding: '12px 15px',
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#333'
              }}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ backgroundColor: '#fff' }}>
              {Object.keys(user).map((key) => (
                <td key={key} style={{
                  border: '1px solid #ddd',
                  padding: '12px 15px'
                }}>{user[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tablerender;
