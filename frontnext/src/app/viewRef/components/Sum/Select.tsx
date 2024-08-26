import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';

interface SelectProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ id, value, onChange, options }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`${TotalStyles.SumTextCommon} ${TotalStyles.SumSelect}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
