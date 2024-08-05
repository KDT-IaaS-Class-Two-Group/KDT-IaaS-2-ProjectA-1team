import React from 'react';

export const createSetJSX = (
  id: number,
  handleDelete: (
    id: number,
    containerRef: React.RefObject<HTMLDivElement>,
    setCount: React.Dispatch<React.SetStateAction<number>>,
  ) => void,
  containerRef: React.RefObject<HTMLDivElement>,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  handleCompositionStart: () => void,
  handleCompositionEnd: () => void,
) => {
  return (
    <div key={id} id={`set-${id}`} className="flex items-center mb-2.5 w-full">
      <input
        type="text"
        placeholder="항목을 입력하세요."
        id={`item-${id}`}
        className="flex-grow border rounded-lg p-2 text-sm mr-2"
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        autoComplete="off"
      />
      <button
        onClick={() => handleDelete(id, containerRef, setCount)}
        className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
      >
        ⏤
      </button>
    </div>
  );
};
