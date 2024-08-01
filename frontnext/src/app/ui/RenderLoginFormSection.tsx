'use client'; // 클라이언트 사이드 렌더링을 보장합니다.

import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // `next/navigation`에서 `useRouter`를 가져옵니다.
import Form from './testComponent/MakeFormSection';
import { styles } from './testComponent/stylesContent';
import { fetchData } from '../lib/fetchDataTest';

// * 정호연이 작업한 모듈
import TableModal from './modal/components/tableModal';
import { TabToggle } from './toggle/tabToggle';
import HeaderSection from './Header/headerSection';

const RenderLoginFormSection: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const router = useRouter(); // 클라이언트 사이드에서 `useRouter` 사용

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 서버에 데이터 전송 후 응답 받기
    const response = await fetchData({ id, password });

    if (response) {
      // 응답이 성공일 경우
      setIsSuccess(true);
    } else {
      // 응답이 실패일 경우
      setIsSuccess(false);
      setIsLoginSuccess(true); // 모달 열기
    }
  };

  return <HeaderSection />;
};

export default RenderLoginFormSection;
