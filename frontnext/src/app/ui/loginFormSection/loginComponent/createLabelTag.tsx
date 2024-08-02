import React from 'react';

interface FormLabelProps {
  htmlFor: string;
  value: string;
  className?: string;
}

const LoginLabelTag: React.FC<FormLabelProps> = ({
  htmlFor,
  value,
  className,
}) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {value}
    </label>
  );
};

export default LoginLabelTag;
