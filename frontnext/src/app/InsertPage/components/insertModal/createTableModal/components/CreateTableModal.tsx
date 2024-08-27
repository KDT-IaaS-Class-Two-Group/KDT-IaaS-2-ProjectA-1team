import React, { useState } from 'react';
import Modal from '@/app/ui/Modal-Test/modalComponent';
import { AddSets } from './CreateTableModalAddSets';
import { useLanguage } from '@/app/ui/SettingMoules/LanguageContext';
import { CreateTableButton } from '@/app/ui/styles/ButtonStyles';

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
      <button className={CreateTableButton} onClick={toggleModal}>
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
