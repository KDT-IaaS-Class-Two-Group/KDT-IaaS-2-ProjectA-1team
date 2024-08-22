'use client';

import React from 'react';

interface HeaderPros {
  children: React.ReactNode;
  className?: string;
}

const HeaderTags: React.FC<HeaderPros> = ({ children, className }) => {
  return <header className={className}>{children}</header>;
};

export default HeaderTags;
