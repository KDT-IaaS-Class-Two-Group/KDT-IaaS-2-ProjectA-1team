import React from 'react';
import TotalStyles from '@/app/ui/styles/TotalStyles';

interface AddRowButtonProps {
  onAddRow: () => void;
}

const AddRowButton: React.FC<AddRowButtonProps> = ({ onAddRow }) => {
  return (
    <button
      className={`${TotalStyles.SidebarButton} ${TotalStyles.CreateTableCreateButton}`}
      onClick={onAddRow}
    >
      행 추가
    </button>
  );
};

export default AddRowButton;
