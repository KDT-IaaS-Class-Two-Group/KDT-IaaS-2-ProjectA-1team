'use client';

import React from 'react';
import ButtonClick from '../Header/headerComponent/headerBtn';
import TotalStyles from '../styles/TotalStyles';

interface RecommendProps {
  className?: string;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RecommendTemp: React.FC<RecommendProps> = ({ className, onClose }) => {
  return (
    <div className={TotalStyles.CreateTableRecommendButtonContainer}>
      <ButtonClick
        type="button"
        className={className}
        textNode="요식업"
        clickFunc={onClose}
      />
      <ButtonClick
        type="button"
        className={className}
        textNode="인력부"
        clickFunc={onClose}
      />
      <ButtonClick
        type="button"
        className={className}
        textNode="돌아가기"
        clickFunc={onClose}
      />
    </div>
  );
};

export default RecommendTemp;
