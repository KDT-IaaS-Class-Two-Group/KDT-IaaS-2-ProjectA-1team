import React from 'react';

interface TagMakerProps {
  tagName: keyof JSX.IntrinsicElements; // 'div', 'span', 'h1' 등 HTML 요소 타입
}

/**
 * TagMaker 컴포넌트는 주어진 태그 이름으로 HTML 요소를 생성하여 반환합니다.
 *
 * @param {TagMakerProps} props - 생성할 HTML 태그의 이름을 포함하는 props
 * @returns {React.ReactElement} - 생성된 HTML 요소
 */
const TagMaker: React.FC<TagMakerProps> = ({ tagName }) => {
  return React.createElement(tagName);
};

export default TagMaker;
