import { useState } from 'react';

interface AddDeleteColumnProps {
  onColumnChange: () => void;
  tableName: string;
}

const AddDeleteColumn: React.FC<AddDeleteColumnProps> = ({ onColumnChange, tableName }) => {
  const [columnName, setColumnName] = useState<string>('');

  const handleAddColumn = async () => {
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
        body: JSON.stringify({ table_name: tableName, column_name: columnName }),
      });

      if (res.ok) {
        console.log('Column added successfully');
        setColumnName('');
        onColumnChange();  // Column 변경시 호출
      } else {
        console.error('Failed to add column:', res.statusText);
      }
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const handleDeleteColumn = async () => {
    if (!columnName) {
      alert('Column name must be provided.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/delete-column/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table_name: tableName, column_name: columnName }),
      });

      if (res.ok) {
        console.log('Column deleted successfully');
        setColumnName('');
        onColumnChange();  // Column 변경시 호출
      } else {
        console.error('Failed to delete column:', res.statusText);
      }
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        placeholder="Enter column name"
      />
      <button onClick={handleAddColumn}>Add Column</button>
      <button onClick={handleDeleteColumn}>Delete Column</button>
    </div>
  );
};

export default AddDeleteColumn;
