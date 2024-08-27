import React from 'react';
import { InputField } from '../components/CreateTablemodalInputField';

export const createSetJSX = (
  id: number,
  handleDelete: (
    id: number,
    containerRef: React.RefObject<HTMLDivElement>,
    setCount: React.Dispatch<React.SetStateAction<number>>,
  ) => void,
  containerRef: React.RefObject<HTMLDivElement>,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void,
  handleCompositionStart: () => void,
  handleCompositionEnd: () => void,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  error: string,
) => {
  return (
    <InputField
      key={id}
      id={id}
      value={value}
      error={error}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onChange={handleInputChange}
      handleDelete={handleDelete}
      containerRef={containerRef}
      setCount={setCount}
    />
  );
};
