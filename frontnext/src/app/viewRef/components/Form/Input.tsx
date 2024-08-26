import React from 'react';
import TotalStyles from '../../../ui/styles/TotalStyles';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={TotalStyles.ToggleInput}
    />
  );
};

export default Input;
