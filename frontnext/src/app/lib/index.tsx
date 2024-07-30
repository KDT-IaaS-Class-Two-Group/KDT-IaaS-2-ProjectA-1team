// pages/index.js
import React, { useState } from 'react';
import { Modal } from '../ui/components/modal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const show = () => {
    setShowModal(true);
  };

  const hidden = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={show}>테이블 생성</button>
      <Modal show={showModal} />
    </div>
  );
};

export default Home;
