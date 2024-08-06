import React, { RefObject } from 'react';

// 타입을 정의합니다.
type SetCountFunction = (value: React.SetStateAction<number>) => void;

export const handleDelete = (
  id: number,
  containerRef: RefObject<HTMLDivElement>,
  setCount: SetCountFunction,
) => {
  const element = document.getElementById(`set-${id}`);
  if (element) {
    element.remove();
    updateLabels(containerRef, setCount);
  }
};

export const updateLabels = (
  containerRef: RefObject<HTMLDivElement>,
  setCount: SetCountFunction,
) => {
  if (!containerRef.current) {
    return;
  }
  const remainingSets = containerRef.current.querySelectorAll('div');
  remainingSets.forEach((set, index) => {
    const input = set.querySelector('input');
    const button = set.querySelector('button');
    const newId = index + 1;
    if (input) input.id = `item-${newId}`;
    if (button) {
      button.onclick = () => handleDelete(newId, containerRef, setCount);
    }
    set.id = `set-${newId}`;
  });
  setCount(remainingSets.length);
};
