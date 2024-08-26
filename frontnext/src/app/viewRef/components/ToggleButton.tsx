import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className={TotalStyles.ToggleButton}>
      {isOpen ? '▲' : '▼'}
    </button>
  );
};

export default ToggleButton;
