import React from 'react';
import { styles } from './stylesContent';

interface InputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    className={styles.input}
    placeholder={placeholder}
  />
);

export default Input;
