'use client';

import React from 'react';
import ButtonClick from '@/app/ui/Header/headerComponent/createBtn';
import { callApi } from '@/app/lib/AJAX';

interface RecommendProps {
  className?: string;
  onClose?: () => void;
}

const RecommendTemp: React.FC<RecommendProps> = ({ className, onClose }) => {
  const handleButtonClick = async (text: string) => {
    const useData = { table: text };

    try {
      const response = await callApi('8000/createRecommend', 'POST', useData);
      console.log(response);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  return (
    <>
      <ButtonClick
        type="button"
        className={className}
        textNode="요식업"
        clickFunc={() => handleButtonClick('요식업')}
      />
      <ButtonClick
        type="button"
        className={className}
        textNode="인력부"
        clickFunc={() => handleButtonClick('인력부')}
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
