import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ModalComponent from './modalComponent';
import ConfirmSaveModal from './components/ConfirmSaveModal';
import ConfirmNavigateModal from './components/ConfirmNavigateModal';
import { AddSets } from './components/AddSets';
import TableData from './components/TableData';
import SidebarStyles from './styles/SidebarStyles';

const TotalSidebar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNavigateModal, setShowNavigateModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [pendingTable, setPendingTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnsToDelete, setColumnsToDelete] = useState<string[]>([]);
  const [editableHeaders, setEditableHeaders] = useState<string[]>([]);
  const [isDataModified, setIsDataModified] = useState(false);
  const [headerErrors, setHeaderErrors] = useState<string[]>([]); // 열 제목의 오류 상태

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTableClick = async (tableName: string) => {
    if (isDataModified) {
      setPendingTable(tableName);
      setShowNavigateModal(true);
    } else {
      await loadTableData(tableName);
    }
  };

  const loadTableData = async (tableName: string) => {
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
      const initialHeaders = Object.keys(data[0] || {});
      setTableData(data);
      setHeaders(initialHeaders);
      setEditableHeaders(initialHeaders);
      setColumnsToDelete([]);
      setIsDataModified(false);
      setHeaderErrors([]); // 오류 초기화
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleSave = () => {
    const errors = editableHeaders.map((header) =>
      header.trim() === '' ? '열 제목을 입력하세요.' : '',
    );
    setHeaderErrors(errors);

    const hasErrors = errors.some((error) => error !== '');

    if (!hasErrors) {
      setShowConfirmModal(true);
    }
  };

  const confirmSave = async () => {
    if (selectedTable) {
      const requestData = {
        table: selectedTable,
        data: tableData,
        columnsToDelete,
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
          setColumnsToDelete([]);
          setIsDataModified(false);
        } else {
          console.error('테이블 업데이트 중 오류 발생:', result);
        }
      } catch (error) {
        console.error('Error saving table data:', error);
      }
    }
    setShowConfirmModal(false);
  };

  const confirmNavigate = async () => {
    if (pendingTable) {
      await loadTableData(pendingTable);
      setPendingTable(null);
    }
    setShowNavigateModal(false);
  };

  const handleDataChange = (updatedData: any[]) => {
    setTableData(updatedData);
    setIsDataModified(true);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce(
      (acc, header) => ({ ...acc, [header]: '' }),
      {},
    );
    setTableData([...tableData, newRow]);
    setIsDataModified(true);
  };

  const handleAddColumn = () => {
    const newColumnName = `column_${headers.length + 1}`;
    const updatedHeaders = [...headers, newColumnName];
    const updatedEditableHeaders = [...editableHeaders, ''];
    const updatedData = tableData.map((row) => ({
      ...row,
      [newColumnName]: '',
    }));
    setHeaders(updatedHeaders);
    setEditableHeaders(updatedEditableHeaders);
    setTableData(updatedData);
    setIsDataModified(true);
    setHeaderErrors([...headerErrors, '']); // 새로운 열에 대한 오류 초기화
  };

  const handleHeaderChange = (index: number, value: string) => {
    const updatedEditableHeaders = [...editableHeaders];
    updatedEditableHeaders[index] = value;
    setEditableHeaders(updatedEditableHeaders);

    const updatedHeaders = [...headers];
    const oldHeader = headers[index];

    updatedHeaders[index] = value || headers[index];
    setHeaders(updatedHeaders);

    const updatedData = tableData.map((row) => {
      const newRow = { ...row };
      if (value) {
        newRow[value] = newRow[oldHeader];
        delete newRow[oldHeader];
      }
      return newRow;
    });

    setTableData(updatedData);
    setIsDataModified(true);

    const updatedErrors = [...headerErrors];
    updatedErrors[index] = value.trim() === '' ? '열 제목을 입력하세요.' : '';
    setHeaderErrors(updatedErrors);
  };

  const handleDeleteColumn = (index: number) => {
    const columnToDelete = headers[index];
    setColumnsToDelete([...columnsToDelete, columnToDelete]);
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
    setIsDataModified(true);
    const updatedErrors = headerErrors.filter((_, i) => i !== index);
    setHeaderErrors(updatedErrors);
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

      <ConfirmSaveModal
        show={showConfirmModal}
        onConfirm={confirmSave}
        onClose={() => setShowConfirmModal(false)}
      />

      <ConfirmNavigateModal
        show={showNavigateModal}
        onConfirm={confirmNavigate}
        onClose={() => setShowNavigateModal(false)}
      />

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
                editableHeaders={editableHeaders}
                onHeaderChange={handleHeaderChange}
                onDeleteRow={(rowIndex: number) => {
                  const newData = [...tableData];
                  newData.splice(rowIndex, 1);
                  setTableData(newData);
                  setIsDataModified(true);
                }}
                onDeleteColumn={handleDeleteColumn}
                headerErrors={headerErrors} // 오류 상태 전달
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
