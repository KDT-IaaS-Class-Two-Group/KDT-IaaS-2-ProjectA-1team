import React from 'react';

interface LabelProps {
  textNode: string;
}

export const Label: React.FC<LabelProps> = ({ textNode }) => {
  return <label>{textNode}</label>;
};
