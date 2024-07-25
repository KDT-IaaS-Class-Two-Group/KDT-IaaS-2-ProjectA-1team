import React from 'react';

interface AddInputProps {
  id: string;
}

export const AddInput: React.FC<AddInputProps> = ({ id }) => {
  return <input type="text" id={id} placeholder="내용을 입력하세요." />;
};
