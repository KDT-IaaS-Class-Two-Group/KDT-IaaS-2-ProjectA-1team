import React, { useRef, useState, useEffect } from 'react';
import { handleDelete, updateLabels } from './utils';
import { createSetJSX } from './createSet';

export const AddSets = () => {
  const [count, setCount] = useState(1);
  const [sets, setSets] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableNameInputRef = useRef<HTMLInputElement | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleClick = () => {
    const id = count + 1;
    setSets((prevSets) => [
      ...prevSets,
      createSetJSX(
        id,
        handleDelete,
        containerRef,
        setCount,
        handleKeyDown,
        handleCompositionStart,
        handleCompositionEnd,
      ),
    ]);
    setCount((prev) => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      const inputs = containerRef.current?.querySelectorAll('input');
      if (inputs) {
        const currentIndex = Array.from(inputs).indexOf(
          e.target as HTMLInputElement,
        );
        const nextIndex = (currentIndex + 1) % inputs.length;
        (inputs[nextIndex] as HTMLInputElement).focus();
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  useEffect(() => {
    if (tableNameInputRef.current) {
      tableNameInputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <div ref={containerRef}>
        <input
          type="text"
          placeholder="테이블 이름을 입력하세요."
          className="border rounded-lg p-2 w-full mb-4"
          ref={tableNameInputRef}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          autoComplete="off"
        />
        {createSetJSX(
          1,
          handleDelete,
          containerRef,
          setCount,
          handleKeyDown,
          handleCompositionStart,
          handleCompositionEnd,
        )}
        {sets}
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
