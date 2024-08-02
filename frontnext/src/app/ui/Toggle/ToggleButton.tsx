import React from 'react';
import styles from '../styles/styles';

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className={styles.toggleButton}>
      {isOpen ? '▲' : '▼'}
    </button>
  );
};

export default ToggleButton;
