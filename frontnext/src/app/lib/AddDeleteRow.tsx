import { useState } from 'react';

interface AddDeleteRowProps {
  tableName: string;
  refreshKey: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

const AddDeleteRow: React.FC<AddDeleteRowProps> = ({ tableName, refreshKey, setRefreshKey }) => {
  const [loading, setLoading] = useState(false);

  const handleAddRow = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/add-row', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table_name: tableName }),
      });

      if (res.ok) {
        setRefreshKey(refreshKey + 1); // 테이블을 다시 렌더링
        console.log('Row added successfully');
      } else {
        console.error('Failed to add row:', res.statusText);
      }
    } catch (error) {
      console.error('Error adding row:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRow = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/delete-row', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table_name: tableName }),
      });

      if (res.ok) {
        setRefreshKey(refreshKey + 1); // 테이블을 다시 렌더링
        console.log('Row deleted successfully');
      } else {
        console.error('Failed to delete row:', res.statusText);
      }
    } catch (error) {
      console.error('Error deleting row:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAddRow} disabled={loading}>
        {loading ? 'Adding...' : 'Add Row'}
      </button>
      <button onClick={handleDeleteRow} disabled={loading} style={{ marginLeft: '10px' }}>
        {loading ? 'Deleting...' : 'Delete Row'}
      </button>
    </div>
  );
};

export default AddDeleteRow;

//* AddDeleteRow.tsx 결합 시 사용 
// "use client";

// import { useState } from 'react';
// import Tablerender from '../lib/tablerender';
// import AddDeleteRow from '../lib/AddDeleteRow';

// export default function Home() {
//   const [refreshKey, setRefreshKey] = useState<number>(0);
//   const [tableName, setTableName] = useState<string>('users');
//   const [error, setError] = useState<string>('');

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
//           <AddDeleteRow tableName={tableName} refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
//         </>
//       ) : (
//         <p>Please enter a table name to view and modify the table.</p>
//       )}
//     </>
//   );
// }
