'use client';

import React from 'react';
import HeaderSection from '../ui/Header/headerSection';
import MainContent from '../ui/SettingMoules/SettingContent';  // MainContent 컴포넌트 불러오기

export default function Home() {
  return (
    <>
      <HeaderSection />
      <MainContent />  {/* MainContent 컴포넌트 사용 */}
    </>
  );
}
