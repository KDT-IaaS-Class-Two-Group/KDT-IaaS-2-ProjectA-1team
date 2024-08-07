'use client';

import React, { useState } from 'react';
import HeaderSection from '../ui/Header/headerSection';
import ToggleSection from '../ui/Toggle/ToggleSection';
import SumComponent from '../ui/Sumsection/Sum';

export default function Home() {
  const [columns, setColumns] = useState<string[]>([]); // 컬럼 데이터 상태 관리
  const [selectedTableData, setSelectedTableData] = useState<
    Array<Record<string, any>>
  >([]); // 선택된 테이블의 데이터 상태

  return (
    <div>
      <HeaderSection />
      <main>
        <ToggleSection
          setColumns={setColumns}
          setSelectedTableData={setSelectedTableData}
        />
        <SumComponent columns={columns} selectedTableData={selectedTableData} />
      </main>
    </div>
  );
}
