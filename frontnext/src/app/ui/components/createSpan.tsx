import React from 'react';

/**
 *
 * @param parent 부모 요소의 ID
 * @param type Span 타입
 * @param value Span 타입의 값
 * @param textNode Span 내에 들어갈 텍스트 내용
 */
const createSpan = (parent: string, type: string, value: string, textNode: string) => {
  const a = document.getElementById(parent);
  const spanElement = `<span ${type}="${value}">${textNode}</span>`;
  if (a) {
    a.innerHTML = spanElement;
  }
};

export default createSpan;
