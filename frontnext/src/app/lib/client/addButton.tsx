// AddBut.tsx code
import React, { useRef, useState } from 'react';
import TagMaker from '@/app/ui/components/TagMaker';

export const AddBut = () => {
  const [count, setCount] = useState(0);
  // const containerRef = useRef(null); // DOM 참조를 저장하기 위한 ref

  // const handleDelete = (id) => {
  //   const element = document.getElementById(`set-${id}`);
  //   if (element) {
  //     element.remove();
  //     updateLabels();
  //   }
  // };

  // const updateLabels = () => {
  //   // 컨테이너 내 모든 요소를 가져와서 순서대로 레이블을 업데이트
  //   const remainingSets = containerRef.current.querySelectorAll('div');
  //   remainingSets.forEach((set, index) => {
  //     const label = set.querySelector('span');
  //     const input = set.querySelector('input');
  //     const button = set.querySelector('button');
  //     const newId = index + 1;
  //     label.textContent = `항목 ${newId}`;
  //     input.id = `item-${newId}`;
  //     button.onclick = () => handleDelete(newId);
  //     set.id = `set-${newId}`;
  //   });
  //   setCount(remainingSets.length); // 실제 남은 요소의 수로 count 업데이트
  // };

  // const handleClick = () => {
  //   const id = count + 1;
  //   const newSet = document.createElement('div');
  //   newSet.id = `set-${id}`;
  //   newSet.style.display = 'flex';
  //   newSet.style.alignItems = 'center';
  //   newSet.style.marginBottom = '10px';

  //   // Label 생성 및 추가
  //   const label = document.createElement('span');
  //   label.textContent = `항목 ${id}`;
  //   newSet.appendChild(label);

  //   // Input 생성 및 추가
  //   const input = document.createElement('input');
  //   input.type = 'text';
  //   input.placeholder = '내용을 입력하세요.';
  //   input.id = `item-${id}`;
  //   newSet.appendChild(input);

  //   // Button 생성 및 추가
  //   const button = document.createElement('button');
  //   button.textContent = '항목 삭제';
  //   button.onclick = () => handleDelete(id); // 클릭 이벤트 핸들러 설정
  //   newSet.appendChild(button);

  //   // 컨테이너에 새로운 세트 추가
  //   containerRef.current.appendChild(newSet);

  //   setCount((prev) => prev + 1);
  // };

  const id = count + 1;
  console.log(id);

  const label = TagMaker('label');
  const input = TagMaker('input');
  const button = TagMaker('button');
  button.textContent = '항목 삭제';

  return (
    <div>
      <button>항목 추가</button>
      {/* <div ref={containerRef}></div> */}
    </div>
  );
};
