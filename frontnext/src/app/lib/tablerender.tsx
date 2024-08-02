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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/tables/${tableName}/rows`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refreshKey, tableName]);

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

//* tabelerender와 AddDeleteColumn을 사요하려면 page.tsx에 넣어야함.
// "use client"; // 이 지시어를 추가하여 클라이언트 컴포넌트로 설정

// import Tablerender from './lib/tablerender';
// import AddDeleteColumn from './lib/AddDeleteColumn';
// import { useState } from 'react';

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
