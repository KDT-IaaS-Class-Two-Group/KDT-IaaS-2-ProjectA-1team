import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';

interface LabelProps {
  htmlFor: string;
  text: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
  return (
    <label htmlFor={htmlFor} className={TotalStyles.SumTextCommon}>
      {text}
    </label>
  );
};

export default Label;
