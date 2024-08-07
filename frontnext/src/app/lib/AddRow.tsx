import React from 'react';

interface AddRowProps {
  onAddRow: () => void;
}

const AddRow: React.FC<AddRowProps> = ({ onAddRow }) => {
  return (
    <div>
      <button onClick={onAddRow}>
        Add Row
      </button>
    </div>
  );
};

export default AddRow;
