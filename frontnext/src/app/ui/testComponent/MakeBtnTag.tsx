import React from 'react';
import { styles } from './stylesContent';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ text, type = 'button' }) => (
  <button type={type} className={styles.button}>
    {text}
  </button>
);

export default Button;
