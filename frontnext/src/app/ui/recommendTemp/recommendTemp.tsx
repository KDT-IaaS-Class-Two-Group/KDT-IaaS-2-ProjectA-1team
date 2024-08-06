'use client';

import React, { useState, useEffect, ReactNode } from 'react';

interface RecommendProps {
  children: ReactNode;
}

const RecommendTemp: React.FC<RecommendProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default RecommendTemp;
