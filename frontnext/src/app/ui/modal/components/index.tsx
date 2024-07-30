// pages/index.js
import React, { useState } from 'react';
import Modal from '../modal';
import { AddSets } from './addSets';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addSets = AddSets();

  return (
    <div>
      <button onClick={handleOpenModal}>테이블 생성</button>
      <Modal show={showModal} onClose={handleCloseModal}>
        {addSets}
      </Modal>
    </div>
  );
};

export default Home;
