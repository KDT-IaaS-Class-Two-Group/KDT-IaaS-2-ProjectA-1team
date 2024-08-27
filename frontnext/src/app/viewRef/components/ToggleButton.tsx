import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';
import ButtonIcon from '../components/ToggleButton/ButtonIcon';

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className={TotalStyles.ToggleButton}>
      <ButtonIcon isOpen={isOpen} />
    </button>
  );
};

export default ToggleButton;
