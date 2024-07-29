import { useState } from 'react';

export const AttrId = () => {
  const [count, setCount] = useState(0);

  const id = count + 1;
  return id;
};
