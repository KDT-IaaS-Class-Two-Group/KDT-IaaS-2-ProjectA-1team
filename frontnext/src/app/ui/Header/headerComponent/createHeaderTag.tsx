import React from 'react';

interface HeaderPros {
  children: React.ReactNode;
  className?: string;
}

const HeaderSection: React.FC<HeaderPros> = ({ children, className }) => {
  return <header className={className}>{children}</header>;
};

export default HeaderSection;
