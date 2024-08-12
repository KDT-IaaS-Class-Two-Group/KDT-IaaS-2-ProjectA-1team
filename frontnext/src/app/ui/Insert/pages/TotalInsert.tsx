import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Modal from '@/app/ui/Modal-Test/modalComponent';
import ConfirmSaveModal from '../components/modals/ConfirmSaveModal';
import ConfirmNavigateModal from '../components/modals/ConfirmNavigateModal';
import TableData from '../components/TableData';
import { useTableDataManagement } from '../components/TableFunctions';
import TotalStyles from '../../styles/TotalStyles';
import { useLanguage } from '../../SettingMoules/LanguageContext';

const TotalSidebar: React.FC = () => {
  const {
    showModal,
    setShowConfirmModal,
    setShowNavigateModal,
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

  const { language } = useLanguage();
  const texts = {
    ko: {
      mainContent: '메인 콘텐츠',
      save: '저장',
    },
    en: {
      mainContent: 'Main Content',
      save: 'Save',
    },
    jp: {
      mainContent: 'メインコンテンツ',
      save: '保存',
    },
    cn: {
      mainContent: '主要内容',
      save: '保存',
    },
    vn: {
      mainContent: 'Nội dung chính',
      save: 'Lưu',
    },
    th: {
      mainContent: 'เนื้อหาหลัก',
      save: 'บันทึก',
    },
  };

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
        onClose={() => setShowConfirmModal(false)}
      />

      <ConfirmNavigateModal
        show={showNavigateModal}
        onConfirm={confirmNavigate}
        onClose={() => setShowNavigateModal(false)}
      />

      <div className={TotalStyles.SidebarMainContent}>
        <h1 className={TotalStyles.SidebarMainTitle}>
          {texts[language].mainContent}
        </h1>

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
              {texts[language].save}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalSidebar;
