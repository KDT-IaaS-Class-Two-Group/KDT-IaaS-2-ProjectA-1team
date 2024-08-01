import React from 'react';

interface InputValueProps {
  id?: string;
  name: string;
  type: string;
  value: string;
  onChangeFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputValueTag: React.FC<InputValueProps> = ({
  id,
  name,
  type,
  value,
  onChangeFunc,
  placeholder,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChangeFunc}
      placeholder={placeholder}
    />
  );
};

export default InputValueTag;
