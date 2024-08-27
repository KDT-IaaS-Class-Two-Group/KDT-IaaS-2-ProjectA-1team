import React, { useState } from 'react';
import Sidebar from '@/app/InsertPage/components/insertSidebar/insertSidebar';
import Modal from '@/app/ui/Modal-Test/modalComponent';
import ConfirmSaveModal from '@/app/InsertPage/components/insertModal/comfirmModal/comfirmSaveModal';
import ConfirmNavigateModal from '@/app/InsertPage/components/insertModal/comfirmModal/comfirmNavigateModal';
import TableData from './tableData';
import { useTableDataManagement } from './tableFunction';
import TotalStyles from '@/app/ui/styles/TotalStyles';
import { useLanguage } from '@/app/ui/SettingMoules/LanguageContext';

const TotalSidebar: React.FC = () => {
  const {
    setShowConfirmModal,
    setShowNavigateModal,
    showConfirmModal,
    showNavigateModal,
    selectedTable,
    headers,
    editableHeaders,
    tableData,
    headerErrors,
    handleTableClick,
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirmAndSave = async () => {
    await confirmSave();
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    window.location.reload(); // 페이지 새로 고침 추가
  };

  return (
    <div className={TotalStyles.SidebarContainer}>
      <Sidebar
        onTableClick={handleTableClick}
        onAddRow={handleAddRow}
        onAddColumn={handleAddColumn}
      />

      <ConfirmSaveModal
        show={showConfirmModal}
        onConfirm={handleConfirmAndSave}
        onClose={() => setShowConfirmModal(false)}
      />

      <ConfirmNavigateModal
        show={showNavigateModal}
        onConfirm={confirmNavigate}
        onClose={() => setShowNavigateModal(false)}
      />

      <div className={TotalStyles.SidebarMainContent}>
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
              onClick={() => setShowConfirmModal(true)}
            >
              {texts[language].save}
            </button>
          </div>
        )}
      </div>

      <Modal show={showSuccessModal} onClose={handleSuccessModalClose}>
        <div className="text-center">
          <p className={TotalStyles.ModalText}>
            데이터가 성공적으로 업데이트되었습니다.
          </p>
          <button
            className={TotalStyles.ConfirmButton}
            onClick={handleSuccessModalClose}
          >
            확인
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TotalSidebar;
