// components/ConfirmNavigateModal.tsx
import React from 'react';
import ConfirmModal from './comfirmModal';
import { ConfirmModalProps } from '@/app/InsertPage/components/interface/ModalProps';

const ConfirmNavigateModal: React.FC<ConfirmModalProps> = (props) => {
  return (
    <ConfirmModal
      {...props}
      message={
        <>
          저장하지 않은 변경 사항이 있습니다. <br />
          저장하지 않고 나가시겠습니까?
        </>
      }
    />
  );
};

export default ConfirmNavigateModal;
