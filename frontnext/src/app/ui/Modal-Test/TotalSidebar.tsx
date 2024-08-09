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
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnToDelete, setColumnToDelete] = useState<string | null>(null);

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
      setHeaders(Object.keys(data[0] || {}));
      console.log(
        '테이블과 연동되지 않는 데이터를 받아와 프론트에 나타냈다:',
        data,
      );
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleSave = async () => {
    if (selectedTable) {
      const requestData = {
        table: selectedTable,
        data: tableData,
        columnToDelete,
      };
      console.log('저장할 데이터:', requestData);
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
          setColumnToDelete(null); // Reset columnToDelete after successful update
        } else {
          console.error('테이블 업데이트 중 오류 발생:', result);
        }
      } catch (error) {
        console.error('Error saving table data:', error);
      }
    }
  };

  const handleDataChange = (updatedData: any[]) => {
    setTableData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce(
      (acc, header) => ({ ...acc, [header]: '' }),
      {},
    );
    setTableData([...tableData, newRow]);
  };

  const handleAddColumn = () => {
    const newColumnName = '';
    const updatedHeaders = [...headers, newColumnName];
    const updatedData = tableData.map((row) => ({
      ...row,
      [newColumnName]: '',
    }));
    setHeaders(updatedHeaders);
    setTableData(updatedData);
  };

  const handleHeaderChange = (index: number, value: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = value;
    setHeaders(updatedHeaders);

    const updatedData = tableData.map((row) => {
      const newRow = { ...row, [value]: row[headers[index]] };
      delete newRow[headers[index]];
      return newRow;
    });

    setTableData(updatedData);
  };

  const handleDeleteColumn = (index: number) => {
    const columnToDelete = headers[index];
    setColumnToDelete(columnToDelete);
    const updatedHeaders = headers.filter((_, i) => i !== index);
    const updatedData = tableData.map((row) => {
      const newRow = { ...row };
      delete newRow[columnToDelete];
      return newRow;
    });
    setHeaders(updatedHeaders);
    setTableData(updatedData);
  };

  return (
    <div className="flex">
      {/* 사이드바 영역 */}
      <Sidebar onTableClick={handleTableClick} />

      {/* 테이블 생성 모달 */}
      <ModalComponent show={showModal} onClose={toggleModal}>
        <div className="text-center">
          <AddSets />
        </div>
      </ModalComponent>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Main Content</h1>
        {selectedTable && (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedTable}</h2>
            <TableData
              data={tableData}
              onDataChange={handleDataChange}
              headers={headers}
              onHeaderChange={handleHeaderChange}
              onDeleteRow={(rowIndex: number) => {
                const newData = [...tableData];
                newData.splice(rowIndex, 1);
                setTableData(newData);
              }}
              onDeleteColumn={handleDeleteColumn}
            />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSave}
            >
              저장
            </button>
            <button
              className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleAddRow}
            >
              행 추가
            </button>
            <button
              className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleAddColumn}
            >
              열 추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalSidebar;
