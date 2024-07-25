import React from 'react';
import { styles } from './stylesContent';

interface LabelProps {
  htmlFor: string;
  text: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, text }) => (
  <label htmlFor={htmlFor} className={styles.label}>
    {text}
  </label>
);

export default Label;
