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
      console.log(
        '테이블과 연동되지 않는 데이터를 받아와 프론트에 나타냈다:',
        data,
      ); // 콘솔 로그 추가
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleSave = async () => {
    if (selectedTable) {
      const requestData = { table: selectedTable, data: tableData };
      console.log('저장할 데이터:', requestData); // 콘솔 로그 추가
      try {
        const response = await fetch('http://localhost:8000/updateTable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        const result = await response.json();
        if (response.ok) {
          console.log('테이블이 정상적으로 업데이트 되었습니다:', result);
        } else {
          console.error('테이블 업데이트 중 오류 발생:', result);
        }
      } catch (error) {
        console.error('Error saving table data:', error);
      }
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
            <TableData data={tableData} />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSave}
            >
              저장
            </button>
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
