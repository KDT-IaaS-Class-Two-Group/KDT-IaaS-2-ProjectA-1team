import React, { useState } from 'react';
import TagMaker from '@/app/ui/components/TagMaker';
/**
 * * input setting
 */
export const InputSet = () => {
  const [count, setCount] = useState(0);

  const id = count + 1;

  const input = TagMaker('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', `item-${id}`);
  input.setAttribute('placeholder', '내용을 입려하세요.');
  console.log(input);
};
