import React from 'react';

interface ButtonIconProps {
  isOpen: boolean;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ isOpen }) => {
  return <>{isOpen ? '▲' : '▼'}</>;
};

export default ButtonIcon;
