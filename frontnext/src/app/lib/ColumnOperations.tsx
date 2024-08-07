import React, { useState } from 'react';

interface ColumnOperationsProps {
  selectedTable: string;
  fetchTableData: (tableName: string) => void;
  setError: (error: string | null) => void;
}

const ColumnOperations: React.FC<ColumnOperationsProps> = ({ selectedTable, fetchTableData, setError }) => {
  const [newColumnName, setNewColumnName] = useState<string>('');

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

  return (
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
  );
};

export default ColumnOperations;
