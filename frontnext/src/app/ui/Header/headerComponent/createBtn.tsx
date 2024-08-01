'use client';

import React from 'react';

interface ButtonProps {
  textNode: string;
  clickFunc?: () => void;
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
