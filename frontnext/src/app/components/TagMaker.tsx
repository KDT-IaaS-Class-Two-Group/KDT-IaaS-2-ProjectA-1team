import React from 'react';

/**
 * 지정된 태그 이름으로 HTML 요소를 생성하는 함수
 *
 * @param tagNames 생성할 HTML 태그의 이름
 * @returns 생성된 HTML 요소
 */
const TagMaker = (tagNames: string): HTMLElement => {
  return document.createElement(tagNames);
};

export default TagMaker;
