'use client';

import React, { useState } from 'react';
import HeaderSection from '../ui/Header/headerSection';
import ToggleSection from '../ui/Toggle/ToggleSection';
import SumComponent from '../ui/Sumsection/Sum';

export default function Home() {
  const [selectedTableData, setSelectedTableData] = useState([
    'Item: 2000원',
    'Item: 3000원',
  ]);
  const [columns, setColumns] = useState([]); // 컬럼 데이터 상태 관리 추가

  return (
    <div>
      <HeaderSection />
      <main>
        <ToggleSection setColumns={setColumns} />
        <SumComponent selectedTableData={selectedTableData} columns={columns} />
      </main>
    </div>
  );
}
