import React from 'react';
import TotalStyles from '../../../ui/styles/TotalStyles';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ text, type = 'submit' }) => {
  return (
    <button type={type} className={TotalStyles.ToggleSubmit}>
      {text}
    </button>
  );
};

export default Button;
