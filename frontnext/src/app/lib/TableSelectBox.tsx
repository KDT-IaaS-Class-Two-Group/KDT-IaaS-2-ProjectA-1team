'use client';

import React from 'react';

interface SelectBoxProps {
  options: string[];
  onChange: (value: string) => void;
  label: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange, label }) => {
  const selectId = `select-box-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
