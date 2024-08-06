'use client';

import React from 'react';
import ButtonClick from '@/app/ui/Header/headerComponent/createBtn';
import { callApi } from '@/app/lib/AJAX';

interface RecommendProps {
  className?: string;
  onclick?: (text: string) => void;
}

const RecommendTemp: React.FC<RecommendProps> = ({ className, onclick }) => {
  // 버튼 클릭 시 호출되는 함수
  const handleButtonClick = async (text: string) => {
    // useData를 생성
    const useData = { table: text };

    try {
      // API 호출
      const response = await callApi('8000/createRecommend', 'POST', useData);
      console.log(response); // 응답을 콘솔에 출력
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
      <ButtonClick type="button" className={className} textNode="돌아가기" />
    </>
  );
};

export default RecommendTemp;
