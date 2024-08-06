'use client';

import { useEffect, useState } from 'react';
import DataTable from './ToggleComponents/DataTable';
import Form from './ToggleComponents/Form';
import ToggleButton from './ToggleButton';
import styles from '../styles/styles';

interface UserDTO {
  [key: string]: string | number;
}

export default function Home() {
  const [name, setName] = useState('');
  const [data, setData] = useState<UserDTO[]>([]);
  const [error, setError] = useState('');
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch('http://localhost:8000/tables');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data: string[] = await res.json();
        setTables(data);
        setSelectedTable(data[0] || '');
      } catch (error) {
        setError('Failed to fetch tables');
      }
    };
    fetchTables();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestData = { table: selectedTable, name: name || null };
      const res = await fetch('http://localhost:8000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data: UserDTO[] = await res.json();
      setData(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch data');
      setData([]);
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className={styles.mainContainer}>
      {isFormOpen && (
        <div className={styles.content}>
          <Form
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            tables={tables}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
      <ToggleButton isOpen={isFormOpen} onClick={toggleForm} />
      <DataTable data={data} />
    </div>
  );
}
