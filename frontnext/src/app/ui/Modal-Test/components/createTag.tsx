import React from 'react';

interface MessageProps {
  textNode: string;
  className?: string;
}

const ModalPTag: React.FC<MessageProps> = ({ textNode, className }) => {
  return <p className={className}>{textNode}</p>;
};

export default ModalPTag;
