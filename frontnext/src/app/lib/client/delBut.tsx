import React, { useState } from 'react';

export const Button = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count : {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
        id={`item-${count}`}
      >
        Click Me
      </button>
    </div>
  );
};
