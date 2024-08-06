'use client';
/**
 * 일단 이건 모달창의 형태. 아니 children으로 들어가야 할 부분이다.
 * children을 핸들링 할 수 있어야 할 듯? chdilren이 변경되는 형태로 클릭이벤트로 useState로 true false값을 핸들링하자
 * useEffect? useCallback? 어느게 더 알맞은 방법이지?
 * 일단 틀만 만들어볼까?
 */
import React, { useState, useEffect, ReactNode } from 'react';
import ButtonClick from '../Header/headerComponent/createBtn';
import { callApi } from '@/app/lib/AJAX';

interface RecommendProps {
  className?: string;
  onclick?: () => void;
}

// 이 return값은 자식으로 들어가는 것을 상정한다. 그렇다면?
const RecommendTemp: React.FC<RecommendProps> = ({ className, onclick }) => {
  const copyToRecommned = () => {
    const useData = {};

    const response = callApi('8000/createRecommend', 'POST', useData);
  };

  return (
    <>
      <ButtonClick
        type="button"
        className={className}
        textNode="요식업"
        clickFunc={onclick}
      />
      <ButtonClick
        type="button"
        className={className}
        textNode="인력부"
        clickFunc={onclick}
      />
      <ButtonClick
        type="button"
        className={className}
        textNode="돌아가기"
        clickFunc={onclick}
      />
    </>
  );
};

export default RecommendTemp;
