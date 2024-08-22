import React from 'react';

interface InputValueProps {
  id?: string;
  name: string;
  type: string;
  value: string;
  onChangeFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const InputValueTag: React.FC<InputValueProps> = ({
  className,
  id,
  name,
  type,
  value,
  onChangeFunc,
  placeholder,
}) => {
  return (
    <input
      className={className}
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
