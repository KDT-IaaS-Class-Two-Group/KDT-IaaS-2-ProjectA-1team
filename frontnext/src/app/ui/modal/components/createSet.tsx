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
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void, // 추가된 인수
  handleCompositionStart: () => void, // 추가된 인수
  handleCompositionEnd: () => void, // 추가된 인수
) => {
  return (
    <div key={id} id={`set-${id}`} className="flex items-center mb-2.5 w-full">
      <input
        type="text"
        placeholder="항목을 입력하세요."
        id={`item-${id}`}
        className="flex-grow border rounded-lg p-2 text-sm mr-2"
        onKeyDown={handleKeyDown} // 수정된 부분: handleKeyDown 추가
        onCompositionStart={handleCompositionStart} // 추가된 부분: handleCompositionStart 추가
        onCompositionEnd={handleCompositionEnd} // 추가된 부분: handleCompositionEnd 추가
        autoComplete="off" // 자동 완성 기능 비활성화
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
