'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ModalComponent from './modalComponent';
import { AddSets } from './components/AddSets';
import TableData from './components/TableData';
import SidebarStyles from './styles/SidebarStyles';

const TotalSidebar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnToDelete, setColumnToDelete] = useState<string | null>(null);
  const [editableHeaders, setEditableHeaders] = useState<string[]>([]);

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
      const initialHeaders = Object.keys(data[0] || {});
      setHeaders(initialHeaders);
      setEditableHeaders(initialHeaders); // 기존 열 제목은 그대로 유지
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
          setColumnToDelete(null);
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
    const newColumnName = `column_${headers.length + 1}`; // 고유한 컬럼 이름 생성
    const updatedHeaders = [...headers, newColumnName];
    const updatedEditableHeaders = [...editableHeaders, '']; // 새로 추가된 열의 제목을 비워둠

    const updatedData = tableData.map((row) => ({
      ...row,
      [newColumnName]: '', // 각 행에 대해 새로운 고유한 열 추가
    }));
    setHeaders(updatedHeaders);
    setEditableHeaders(updatedEditableHeaders);
    setTableData(updatedData);
  };

  const handleHeaderChange = (index: number, value: string) => {
    const updatedEditableHeaders = [...editableHeaders];
    updatedEditableHeaders[index] = value;
    setEditableHeaders(updatedEditableHeaders);

    const updatedHeaders = [...headers];
    updatedHeaders[index] = value || headers[index]; // 빈 값이면 기존 헤더를 유지

    const updatedData = tableData.map((row) => {
      const newRow = { ...row, [updatedHeaders[index]]: row[headers[index]] };
      delete newRow[headers[index]];
      return newRow;
    });

    setHeaders(updatedHeaders);
    setTableData(updatedData);
  };

  const handleDeleteColumn = (index: number) => {
    const columnToDelete = headers[index];
    setColumnToDelete(columnToDelete);
    const updatedHeaders = headers.filter((_, i) => i !== index);
    const updatedEditableHeaders = editableHeaders.filter(
      (_, i) => i !== index,
    );
    const updatedData = tableData.map((row) => {
      const newRow = { ...row };
      delete newRow[columnToDelete];
      return newRow;
    });
    setHeaders(updatedHeaders);
    setEditableHeaders(updatedEditableHeaders);
    setTableData(updatedData);
  };

  return (
    <div className={SidebarStyles.container}>
      <Sidebar
        onTableClick={handleTableClick}
        onAddRow={handleAddRow}
        onAddColumn={handleAddColumn}
      />

      <ModalComponent show={showModal} onClose={toggleModal}>
        <div className={SidebarStyles.modalOverlay}>
          <AddSets />
        </div>
      </ModalComponent>

      <div className={SidebarStyles.mainContent}>
        <h1 className={SidebarStyles.mainTitle}>Main Content</h1>
        {selectedTable && (
          <div>
            <h2 className={SidebarStyles.tableTitle}>{selectedTable}</h2>
            <div className={SidebarStyles.tableWrapper}>
              <TableData
                data={tableData}
                onDataChange={handleDataChange}
                headers={headers}
                editableHeaders={editableHeaders} // 표시용 헤더 전달
                onHeaderChange={handleHeaderChange}
                onDeleteRow={(rowIndex: number) => {
                  const newData = [...tableData];
                  newData.splice(rowIndex, 1);
                  setTableData(newData);
                }}
                onDeleteColumn={handleDeleteColumn}
              />
            </div>
            <button className={SidebarStyles.saveButton} onClick={handleSave}>
              저장
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalSidebar;
