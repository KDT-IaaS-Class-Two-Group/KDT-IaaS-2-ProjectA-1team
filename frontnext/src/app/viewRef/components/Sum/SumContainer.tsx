import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';

interface SumContainerProps {
  children: React.ReactNode;
}

const SumContainer: React.FC<SumContainerProps> = ({ children }) => {
  return (
    <div className={TotalStyles.SumContainer}>
      <hr className={TotalStyles.SumDivider} />
      <div className={TotalStyles.SumInnerContainer}>{children}</div>
    </div>
  );
};

export default SumContainer;
