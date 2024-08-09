"use client";

import React, { useEffect, useState, useRef } from 'react';
import TableRendering from '../lib/TableRendering';
import TableList from '../lib/TableList';
import ColumnOperations from '../lib/ColumnOperations';
import AddRow from '../lib/AddRow';

interface Data {
  id: number;
  [key: string]: any;
}

interface Table {
  name: string;
}

const Page = () => {
  const [data, setData] = useState<Data[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [editData, setEditData] = useState<{ [key: number]: Partial<Data> }>({});
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    fetch('http://localhost:8080/tables/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTables(data);
          if (data.length > 0) {
            setSelectedTable(data[0].name);
          }
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (selectedTable) {
      fetchTableData(selectedTable);
    }
  }, [selectedTable]);

  const fetchTableData = (tableName: string) => {
    fetch(`http://localhost:8080/${tableName}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setData(data);
          setEditData({});
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleEdit = (id: number, field: string, value: any) => {
    setEditData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    const saveData = Object.keys(editData).map(async id => {
      const dataItem = editData[parseInt(id)];
      const originalData = data.find(d => d.id === parseInt(id));
      if (dataItem && originalData) {
        const updatedData = { ...originalData, ...dataItem };
        const response = await fetch(`http://localhost:8080/${selectedTable}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        return { id, ok: response.ok, response };
      }
      return { id, ok: false, response: null };
    });

    const results = await Promise.all(saveData);

    const failedRequests = results.filter(result => !result.ok);
    if (failedRequests.length > 0) {
      failedRequests.forEach(req => {
        console.error(`Failed to save ${req.id}`, req.response);
      });
      setError('Network response was not ok for one or more requests');
    } else {
      fetchTableData(selectedTable); // 최신 데이터를 다시 가져옵니다.
      setEditData({});
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number, field: string) => {
    if (e.key === 'Enter') {
      const currentData = data;
      const nextIndex = currentData.findIndex(d => d.id === id) + 1;
      const nextData = currentData[nextIndex];
      if (nextData) {
        inputRefs.current[nextData.id]?.focus();
      }
    }
  };

  const handleAddRow = () => {
    const newRow = { id: data.length + 1, name: '', price: '' }; // 기본 빈 행 데이터
    setData(prevData => [...prevData, newRow]);
    setEditData(prevEditData => ({ ...prevEditData, [newRow.id]: newRow }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex' }}>
        <TableList tables={tables} setSelectedTable={setSelectedTable} />
        <div style={{ padding: '10px', flexGrow: 1 }}>
          <h1>{selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)} List</h1>
          <TableRendering 
            data={data} 
            editData={editData} 
            handleEdit={handleEdit} 
            handleKeyPress={handleKeyPress}
            inputRefs={inputRefs}
          />
        </div>
      </div>
      <ColumnOperations 
        selectedTable={selectedTable} 
        fetchTableData={fetchTableData} 
        setError={setError} 
      />
      <AddRow onAddRow={handleAddRow} />
      <div>
        <button onClick={handleSave} style={{ alignSelf: 'flex-end' }}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Page;
