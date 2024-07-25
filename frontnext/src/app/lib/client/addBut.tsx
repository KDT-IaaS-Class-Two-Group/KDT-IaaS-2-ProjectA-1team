import React, { useState, ReactElement } from 'react';
import { AddInput } from './addInput';

export const AddBut = () => {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState<ReactElement[]>([]);

  return (
    <div>
      <div>count : {count}</div>
      <button
        onClick={() => {
          setInputs([
            ...inputs,
            <AddInput key={inputs.length} id={`item-${count + 1}`} />,
          ]);
          setCount(count + 1);
        }}
      >
        항목 추가
      </button>
      {inputs.map((input) => input)}
    </div>
  );
};
