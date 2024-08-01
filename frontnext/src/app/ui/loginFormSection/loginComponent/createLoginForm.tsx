import React from 'react';

interface LoginFormProps {
  children: React.ReactNode;
}

const LoginForm: React.FC<LoginFormProps> = ({ children }) => {
  return <form action="">{children}</form>;
};
