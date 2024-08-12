import React from 'react';
import TotalStyles from '@/app/ui/styles/TotalStyles';

interface AddColumnButtonProps {
  onAddColumn: () => void;
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ onAddColumn }) => {
  return (
    <button
      className={`${TotalStyles.SidebarButton} ${TotalStyles.SidebarAddColumnButton}`}
      onClick={onAddColumn}
    >
      열 추가
    </button>
  );
};

export default AddColumnButton;
