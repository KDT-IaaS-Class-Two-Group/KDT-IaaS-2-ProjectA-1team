import React, { useState } from 'react';
import Modal from '../modalComponent';
import { AddSets } from './AddSets';
import SidebarStyles from '../styles/SidebarStyles';

const TableModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button
        className={`${SidebarStyles.button} ${SidebarStyles.createButton}`}
        onClick={toggleModal}
      >
        테이블 생성
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
