'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ModalComponent from './ModalComponent';
import { CreateTableForm } from './components/CreateTableForm';

const TotalSidebar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex">
      {/* 사이드바 영역 === 테이블 생성, 열추가, 열 삭제, 행 추가, 행 삭제, 검색, 테이블 이름 리스트 */}
      <Sidebar toggleModal={toggleModal} />

      {/* 메인 콘텐츠 영역 === 테이블 수정 영역 */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Main Content</h1>
      </div>

      {/* 테이블 생성 모달*/}
      <ModalComponent show={showModal} onClose={toggleModal}>
        <div className="text-center">
          <CreateTableForm />
        </div>
      </ModalComponent>
    </div>
  );
};

export default TotalSidebar;
