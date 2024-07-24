import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// button 컴포넌트 정의
export const Button = () => {
  const [count, setCount] = useState(0);

  return <button id={`button-${count}`}>Click Me</button>;
};
