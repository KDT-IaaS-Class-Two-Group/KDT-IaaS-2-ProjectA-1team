import React from 'react';
import SidebarStyles from '../../styles/SidebarStyles';

interface AddRowButtonProps {
  onAddRow: () => void;
}

const AddRowButton: React.FC<AddRowButtonProps> = ({ onAddRow }) => {
  return (
    <button
      className={`${SidebarStyles.button} ${SidebarStyles.addRowButton}`}
      onClick={onAddRow}
    >
      행 추가
    </button>
  );
};

export default AddRowButton;
