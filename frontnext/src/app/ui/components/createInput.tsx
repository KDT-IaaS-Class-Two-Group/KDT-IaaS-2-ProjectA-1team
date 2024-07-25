import React from 'react';

/**
 *
 * @param parent 부모 요소의 ID
 * @param type 입력 요소의 타입
 * @param id 입력 요소의 ID
 * @param name 입력 요소의 이름
 */
const createInput = (parent: string, type: string, id: string, name: string) => {
  const a = document.getElementById(parent);
  const content = `<input type="${type}" id="${id}" name="${name}">`;
  if (a) {
    a.innerHTML = content;
  }
};

export default createInput;
