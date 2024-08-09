'use client';

import React from 'react';
import ButtonClick from '@/app/ui/Header/headerComponent/createBtn';

interface RecommendProps {
  className?: string;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RecommendTemp: React.FC<RecommendProps> = ({ className, onClose }) => {
  return (
    <>
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
    </>
  );
};

export default RecommendTemp;
