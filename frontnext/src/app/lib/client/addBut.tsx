import React, { useState, ReactElement } from 'react';
import { AddInput } from './addInput';
import { DelBut } from './delBut';
import { Label } from './label';

export const AddBut = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<ReactElement[]>([]);

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div>count: {count}</div>
      <button
        onClick={() => {
          const newInput = <AddInput key={count} id={`item-${count + 1}`} />;
          const newButton = (
            <DelBut
              key={count}
              onDelete={() => handleDelete(count)}
              id={`item-${count + 1}`}
            />
          );
          const newItem = (
            <div
              key={count}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {newInput}
              {newButton}
            </div>
          );

          setItems([...items, newItem]);
          setCount(count + 1);
        }}
      >
        항목 추가
      </button>
      {items}
    </div>
  );
};
