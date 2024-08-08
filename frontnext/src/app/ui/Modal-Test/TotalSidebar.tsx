'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ModalComponent from './ModalComponent';
import { AddSets } from './components/AddSets';
import TableData from './components/TableData';

const TotalSidebar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTableClick = async (tableName: string) => {
    setSelectedTable(tableName);
    try {
      const response = await fetch('http://localhost:8080/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table: tableName }),
      });
      const data = await response.json();
      setTableData(data);
      console.log('테이블과 연동되지 않은 데이터:', data); // 콘솔 로그 추가
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  return (
    <div className="flex">
      {/* 사이드바 영역 */}
      <Sidebar onTableClick={handleTableClick} />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Main Content</h1>
        {selectedTable && (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedTable}</h2>
            <pre>{JSON.stringify(tableData, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* 테이블 생성 모달 */}
      <ModalComponent show={showModal} onClose={toggleModal}>
        <div className="text-center">
          <AddSets />
        </div>
      </ModalComponent>
    </div>
  );
};

export default TotalSidebar;
