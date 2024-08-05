'use client'; // 클라이언트 컴포넌트로 설정

import React from 'react';

interface SelectBoxProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ label, options, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="select-box">{label}</label>
      <select id="select-box" title={label} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
