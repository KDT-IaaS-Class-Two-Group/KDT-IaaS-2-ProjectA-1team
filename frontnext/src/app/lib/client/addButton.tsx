// AddBut.tsx code
import React, { useRef, useState } from 'react';
import { AddInput } from './addInput';
import { DelBut } from './deleteButton';
import { Label } from './label';

export const AddBut = () => {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null); // DOM 참조를 저장하기 위한 ref

  const handleDelete = (id:string) => {
    const element = document.getElementById(`set-${id}`);
    if (element) {
      element.remove(); // DOM에서 직접 요소 삭제
    }
  };

  const handleClick = () => {
    const id = count + 1;
    const newSet = document.createElement('div');
    newSet.id = `set-${id}`;
    newSet.style.display = 'flex';
    newSet.style.alignItems = 'center';
    newSet.style.marginBottom = '10px';

    // Label 생성 및 추가
    const label = document.createElement('span');
    label.textContent = `항목 ${id}`;
    newSet.appendChild(label);

    // Input 생성 및 추가
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '내용을 입력하세요.';
    input.id = `item-${id}`;
    newSet.appendChild(input);

    // Button 생성 및 추가
    const button = document.createElement('button');
    button.textContent = '항목 삭제';
    button.onclick = () => handleDelete(id); // 클릭 이벤트 핸들러 설정
    newSet.appendChild(button);

    // 컨테이너에 새로운 세트 추가
    containerRef.current.appendChild(newSet);

    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>항목 추가</button>
      <div ref={containerRef}></div>
    </div>
  );
};
