import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Modal from '@/app/ui/Modal-Test/modalComponent';
import ConfirmSaveModal from '../components/modals/ConfirmSaveModal';
import ConfirmNavigateModal from '../components/modals/ConfirmNavigateModal';
import TableData from '../components/TableData';
import { useTableDataManagement } from '../components/TableFunctions';
import TotalStyles from '../../styles/TotalStyles';

const TotalSidebar: React.FC = () => {
  const {
    showModal,
    setShowConfirmModal, // <- 추가됨
    setShowNavigateModal, // <- 추가됨
    showConfirmModal,
    showNavigateModal,
    selectedTable,
    headers,
    editableHeaders,
    tableData,
    headerErrors,
    toggleModal,
    handleTableClick,
    handleSave,
    confirmSave,
    confirmNavigate,
    handleDataChange,
    handleAddRow,
    handleAddColumn,
    handleHeaderChange,
    handleDeleteColumn,
  } = useTableDataManagement();

  return (
    <div className={TotalStyles.SidebarContainer}>
      <Sidebar
        onTableClick={handleTableClick}
        onAddRow={handleAddRow}
        onAddColumn={handleAddColumn}
      />

      <Modal show={showModal} onClose={toggleModal}>
        <div className={TotalStyles.LoginMessageContainer}>
          {/* 모달 콘텐츠 */}
        </div>
      </Modal>

      <ConfirmSaveModal
        show={showConfirmModal}
        onConfirm={confirmSave}
        onClose={() => setShowConfirmModal(false)} // <- 수정됨
      />

      <ConfirmNavigateModal
        show={showNavigateModal}
        onConfirm={confirmNavigate}
        onClose={() => setShowNavigateModal(false)} // <- 수정됨
      />

      <div className={TotalStyles.SidebarMainContent}>
        <h1 className={TotalStyles.SidebarMainTitle}>Main Content</h1>
        {selectedTable && (
          <div>
            <h2 className={TotalStyles.SidebarTableTitle}>{selectedTable}</h2>
            <div>
              <TableData
                data={tableData}
                onDataChange={handleDataChange}
                headers={headers}
                editableHeaders={editableHeaders}
                onHeaderChange={handleHeaderChange}
                onDeleteRow={(rowIndex: number) => {
                  const newData = [...tableData];
                  newData.splice(rowIndex, 1);
                  handleDataChange(newData);
                }}
                onDeleteColumn={handleDeleteColumn}
                headerErrors={headerErrors}
              />
            </div>
            <button
              className={TotalStyles.SidebarSaveButton}
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalSidebar;
