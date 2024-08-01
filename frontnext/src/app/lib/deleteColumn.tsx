import { useState } from 'react';

interface DeleteColumnProps {
  onColumnChange: () => void;
}

const DeleteColumn: React.FC<DeleteColumnProps> = ({ onColumnChange }) => {
  const [deleteColumnName, setDeleteColumnName] = useState<string>('');

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
        console.log('Column deleted successfully');
        setDeleteColumnName('');
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
        value={deleteColumnName}
        onChange={(e) => setDeleteColumnName(e.target.value)}
        placeholder="Enter column name to delete"
      />
      <button onClick={deleteColumn}>Delete Column</button>
    </div>
  );
};

export default DeleteColumn;