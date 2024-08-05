'use client';

import React from 'react';
import HeaderSection from '../ui/Header/headerSection';
import ToggleSection from '../ui/Toggle/ToggleSection';
import SumComponent from '../ui/Sumsection/Sum';

export default function Home() {
  const selectedTableData = ['Item: 2000원', 'Item: 3000원'];
  //특정 table을 읽어와서 ㅌ

  return (
    <div>
      <HeaderSection />
      <main>
        <ToggleSection />
        <SumComponent selectedTableData={selectedTableData} />
      </main>
    </div>
  );
}
