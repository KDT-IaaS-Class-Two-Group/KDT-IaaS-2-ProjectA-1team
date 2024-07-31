import React from 'react';

export const Toggle = (
  show: boolean,
  onClose: () => void,
  children: React.ReactNode,
) => {
  if (!show) {
    return null;
  }
  return (
    <div>
      <div>{children}</div>
      <button onClick={onClose}>▼</button>
    </div>
  );
};
