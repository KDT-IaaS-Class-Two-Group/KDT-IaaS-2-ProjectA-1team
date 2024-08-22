'use client';

import React from 'react';

interface ContainerDivProps {
  children: React.ReactNode;
  className?: string;
}

const ConDiv: React.FC<ContainerDivProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default ConDiv;
