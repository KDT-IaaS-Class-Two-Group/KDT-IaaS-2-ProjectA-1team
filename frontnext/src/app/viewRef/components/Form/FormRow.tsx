import React from 'react';
import TotalStyles from '../../../ui/styles/TotalStyles';

interface FormRowProps {
  children: React.ReactNode;
}

const FormRow: React.FC<FormRowProps> = ({ children }) => {
  return <div className={TotalStyles.ToggleFormRow}>{children}</div>;
};

export default FormRow;
