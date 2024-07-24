import React from 'react';

/**
 *
 * @param parent 부모 요소의 ID
 * @param textNode div 내에 삽입할 텍스트
 */
const createDiv = (parent: string, textNode: string) => {
  const a = document.getElementById(parent);
  const divs = `<div>${textNode}</div>`; // 문자열을 따옴표로 둘러싸지 않았습니다.
  if (a) {
    a.innerHTML = divs;
  }
};

export default createDiv;
