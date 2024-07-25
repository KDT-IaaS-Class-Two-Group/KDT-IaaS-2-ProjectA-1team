import React from 'react';

/**
 *
 * @param buttonText 버튼에 표시될 텍스트
 * @returns 생성된 버튼 요소
 */
const createButton = (buttonText: string): HTMLButtonElement => {
  const butt = document.createElement('button');
  butt.innerText = buttonText;
  return butt;
};

export default createButton;
