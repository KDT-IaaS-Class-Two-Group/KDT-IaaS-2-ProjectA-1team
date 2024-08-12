import React, { useState } from 'react';
import Modal from '../modalComponent';
import { AddSets } from './AddSets';
import TotalStyles from '../../styles/TotalStyles';
import { useLanguage } from '../../SettingMoules/LanguageContext';

const TableModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { language } = useLanguage();
  const texts = {
    ko: '테이블 생성',
    en: 'Create Table',
    jp: 'テーブルを作成',
    cn: '创建表',
    vn: 'Tạo bảng',
    th: 'สร้างตาราง',
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button
        className={`${TotalStyles.SidebarButton} ${TotalStyles.ModalConfirmButton}`}
        onClick={toggleModal}
      >
        {texts[language]}
      </button>
      <Modal show={showModal} onClose={toggleModal}>
        <div className="text-center">
          <AddSets />
        </div>
      </Modal>
    </div>
  );
};

export default TableModal;
