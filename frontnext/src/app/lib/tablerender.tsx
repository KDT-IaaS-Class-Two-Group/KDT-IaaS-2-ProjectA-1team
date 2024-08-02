import { useEffect, useState } from 'react';

interface User {
  id: string;
  [key: string]: any;
}

interface TablerenderProps {
  refreshKey: number;
  tableName: string;
}

const Tablerender: React.FC<TablerenderProps> = ({ refreshKey, tableName }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [tempUsers, setTempUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/tables/${tableName}/rows`);
        const data: User[] = await res.json();
        setUsers(data);
        setTempUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refreshKey, tableName]);

  const handleDoubleClick = (id: string, key: string) => {
    setEditing({ ...editing, [`${id}-${key}`]: true });
  };

  const handleChange = (id: string, key: string, value: string) => {
    const updatedUsers = tempUsers.map(user => 
      user.id === id ? { ...user, [key]: value } : user
    );
    setTempUsers(updatedUsers);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8080/update-rows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName, data: tempUsers }),
      });

      if (res.ok) {
        setUsers(tempUsers);
        setEditing({});
        console.log('Table updated successfully');
      } else {
        console.error('Failed to update table:', res.statusText);
      }
    } catch (error) {
      console.error('Error updating table:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{tableName} Table</h1>
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
                }} onDoubleClick={() => handleDoubleClick(user.id, key)}>
                  {editing[`${user.id}-${key}`] ? (
                    <input
                      type="text"
                      value={tempUsers.find(u => u.id === user.id)?.[key] || ''}
                      onChange={(e) => handleChange(user.id, key, e.target.value)}
                    />
                  ) : (
                    user[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave} style={{ marginTop: '20px' }}>Save Changes</button>
    </div>
  );
};

export default Tablerender;

//* tablerender.tsx, AddDeleteColumn.tsx, addcolumn_render.py 사용할 시 필요.

// 'use client';

// import { useState } from 'react';
// import Tablerender from './lib/tablerender';
// import AddDeleteColumn from './lib/AddDeleteColumn';

// export default function Home() {
//   const [refreshKey, setRefreshKey] = useState<number>(0);
//   const [tableName, setTableName] = useState<string>('users');
//   const [error, setError] = useState<string>('');

//   const handleColumnChange = () => {
//     setRefreshKey((prevKey) => prevKey + 1);
//   };

//   const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setTableName(value);
//     if (!value) {
//       setError('Table name must be provided.');
//     } else {
//       setError('');
//     }
//   };

//   return (
//     <>
//       <div>
//         <input
//           type="text"
//           value={tableName}
//           onChange={handleTableNameChange}
//           placeholder="Enter table name"
//         />
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//       {tableName ? (
//         <>
//           <Tablerender refreshKey={refreshKey} tableName={tableName} />
//           <AddDeleteColumn onColumnChange={handleColumnChange} tableName={tableName} />
//         </>
//       ) : (
//         <p>Please enter a table name to view and modify the table.</p>
//       )}
//     </>
//   );
// }
