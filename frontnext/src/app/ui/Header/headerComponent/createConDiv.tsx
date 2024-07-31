import React from 'react';

interface ContainerDiv {
  children: React.ReactNode;
}

export const ConDiv: React.FC<ContainerDiv> = ({ children }) => {
  return <div>{children}</div>;
};
