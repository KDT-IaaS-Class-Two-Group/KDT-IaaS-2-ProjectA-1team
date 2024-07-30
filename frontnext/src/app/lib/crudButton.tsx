'use client'; 

import React from 'react';

const ButtonSection: React.FC = () => {
  return (
    <div>
      <button onClick={() => alert('Button 1 clicked!')}>열추가</button>
      <button onClick={() => alert('Button 2 clicked!')}>열삭제</button>
      <button onClick={() => alert('Button 3 clicked!')}>행추가</button>
      <button onClick={() => alert('Button 4 clicked!')}>행삭제</button>
    </div>
  );
};

export default ButtonSection;