'use client';

import React from 'react';
import { useRouter } from 'next/router';

interface ButtonProps {
  textNode: string;
  clickFunc?: () => {};
  className?: string;
}

const ButtonClick: React.FC<ButtonProps> = ({
  textNode,
  clickFunc,
  className,
}) => {
  return (
    <button onClick={clickFunc} className={className}>
      {textNode}
    </button>
  );
};

export default ButtonClick;
