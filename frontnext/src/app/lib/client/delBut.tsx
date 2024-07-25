// DelBut.tsx code
import React from 'react';

interface DelButProps {
  id: string;
  onDelete: (id: string) => void; // 삭제 함수 추가
}

export const DelBut: React.FC<DelButProps> = ({ id, onDelete }) => {
  return <button onClick={() => onDelete(id)}>항목 삭제</button>;
};
