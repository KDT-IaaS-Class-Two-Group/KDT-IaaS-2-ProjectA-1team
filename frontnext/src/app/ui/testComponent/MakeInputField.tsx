import React from 'react';
import Label from './MakeLabelTag';
import Input from './MakeInputTag';

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  value,
  onChange,
  label,
  placeholder,
}) => (
  <div className="mb-4">
    <Label htmlFor={id} text={label} />
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
