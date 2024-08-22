'use client';

import React from 'react';

interface ButtonProps {
  textNode: string;
  clickFunc?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
  type?: 'submit' | 'button';
}

const ButtonClick: React.FC<ButtonProps> = ({
  textNode,
  clickFunc,
  className,
  type,
}) => {
  return (
    <button type={type} onClick={clickFunc} className={className}>
      {textNode}
    </button>
  );
};

export default ButtonClick;
