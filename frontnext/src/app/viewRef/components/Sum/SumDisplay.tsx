import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';

interface SumDisplayProps {
  sum: string;
}

const SumDisplay: React.FC<SumDisplayProps> = ({ sum }) => {
  return (
    <span className={TotalStyles.SumTextCommon}>{sum ? `${sum}` : ''}</span>
  );
};

export default SumDisplay;
