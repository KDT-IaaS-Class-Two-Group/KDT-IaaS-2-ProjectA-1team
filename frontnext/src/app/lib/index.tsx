"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Data {
  id: number;
  [key: string]: any;
}

interface Table {
  name: string;
}

const Tablerendering = () => {
  const [data, setData] = useState<Data[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [editData, setEditData] = useState<{ [key: number]: Partial<Data> }>({});
  const [newColumnName, setNewColumnName] = useState<string>('');
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

  const handleAddColumn = async () => {
    const response = await fetch(`http://localhost:8080/${selectedTable}/add_column`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ column_name: newColumnName }),
    });

    if (response.ok) {
      fetchTableData(selectedTable);
      setNewColumnName('');
    } else {
      const result = await response.json();
      setError(result.detail);
    }
  };

  const handleDeleteColumn = async () => {
    const response = await fetch(`http://localhost:8080/${selectedTable}/delete_column`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ column_name: newColumnName }),
    });

    if (response.ok) {
      fetchTableData(selectedTable);
      setNewColumnName('');
    } else {
      const result = await response.json();
      setError(result.detail);
    }
  };

  const renderTable = (data: any[], editData: { [key: number]: any }, handleEdit: any) => {
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {Object.keys(item).map(key => (
                <td key={key}>
                  {key === 'id' ? (
                    item[key]
                  ) : (
                    <input
                      ref={el => {
                        if (key !== 'id') {
                          inputRefs.current[item.id] = el;
                        }
                      }}
                      type="text"
                      value={editData[item.id]?.[key] !== undefined ? editData[item.id][key] : item[key] || ''}
                      onChange={e => handleEdit(item.id, key, e.target.value)}
                      onKeyPress={e => handleKeyPress(e, item.id, key)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', padding: '10px', borderRight: '1px solid #ddd' }}>
          <h3>Tables</h3>
          <ul>
            {tables.map((table, index) => (
              <li key={index} onClick={() => setSelectedTable(table.name)} style={{ cursor: 'pointer' }}>
                {table.name}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ padding: '10px', flexGrow: 1 }}>
          <h1>{selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)} List</h1>
          {renderTable(data, editData, handleEdit)}
        </div>
      </div>
      <div>
        <input 
          type="text" 
          value={newColumnName} 
          onChange={e => setNewColumnName(e.target.value)} 
          placeholder="Column name" 
        />
        <button onClick={handleAddColumn}>
          Add Column
        </button>
        <button onClick={handleDeleteColumn}>
          Delete Column
        </button>
      </div>
      <div>
        <button onClick={handleSave} style={{ alignSelf: 'flex-end' }}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Tablerendering;
