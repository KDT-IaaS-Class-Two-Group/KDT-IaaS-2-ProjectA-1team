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
      <div ref={containerRef}>
        <input
          type="text"
          placeholder="테이블 이름을 입력하세요."
          className="border rounded-lg p-2 w-full mb-4"
        />
      </div>
      <div className="space-x-10">
        <button
          type="button"
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          추가
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          생성
        </button>
      </div>
    </div>
  );
};
