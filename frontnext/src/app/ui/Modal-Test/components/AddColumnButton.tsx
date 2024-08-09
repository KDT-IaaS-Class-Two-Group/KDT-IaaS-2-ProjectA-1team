import React from 'react';
import SidebarStyles from '../styles/SidebarStyles';

interface AddColumnButtonProps {
  onAddColumn: () => void;
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ onAddColumn }) => {
  return (
    <button
      className={`${SidebarStyles.button} ${SidebarStyles.addColumnButton}`}
      onClick={onAddColumn}
    >
      열 추가
    </button>
  );
};

export default AddColumnButton;
