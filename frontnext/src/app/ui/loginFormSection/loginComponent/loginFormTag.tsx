import React, { FormEvent } from 'react';

interface LoginFormProps {
  children: React.ReactNode;
  className?: string;
  onSubmitFunc?: (e: FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onSubmitFunc,
  children,
}) => {
  return (
    <form className={className} onSubmit={onSubmitFunc}>
      {children}
    </form>
  );
};

export default LoginForm;
