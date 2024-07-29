import React, { useRef, useState } from 'react';
import { handleDelete, updateLabels } from './utils';
import { createSet } from './createSet';

export const AddSets = () => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    const id = count + 1;
    const newSet = createSet(id, handleDelete, containerRef, setCount);

    (containerRef.current as HTMLDivElement).appendChild(newSet);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>항목 추가</button>
      <div ref={containerRef}></div>
    </div>
  );
};
