// pages/index.tsx
import React, { useState } from 'react';
import Modal from '../modalComponent';
import { CreateTableForm } from './form';

const TableModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={toggleModal}
      >
        테이블 생성
      </button>
      <Modal show={showModal} onClose={toggleModal}>
        <div className="text-center">
          <CreateTableForm />
        </div>
      </Modal>
    </div>
  );
};

export default TableModal;
