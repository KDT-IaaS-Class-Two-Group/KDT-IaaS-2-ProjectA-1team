import { useEffect, useState } from 'react';

interface User {
  id: string;
  password: string;
  [key: string]: any;
}

interface TablerenderProps {
  refreshKey: number;
}

const Tablerender: React.FC<TablerenderProps> = ({ refreshKey }) => {
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
  }, [refreshKey]);

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


//* 실행시 page.tsx에 넣어야함
// "use client"; // 이 지시어를 추가하여 클라이언트 컴포넌트로 설정


// import Tablerender from './lib/tablerender';
// import AddColumn from './lib/addColumn';
// import DeleteColumn from './lib/deleteColumn';
// import Search from './lib/search';
// import { useState } from 'react';

// export default function Home() {
//   const [refreshKey, setRefreshKey] = useState<number>(0);

//   const handleColumnChange = () => {
//     setRefreshKey((prevKey) => prevKey + 1);
//   };

//   return (
//     <>
     
//       <Tablerender refreshKey={refreshKey} />
//       <AddColumn onColumnChange={handleColumnChange} />
//       <DeleteColumn onColumnChange={handleColumnChange} />
//     </>
//   );
// }
