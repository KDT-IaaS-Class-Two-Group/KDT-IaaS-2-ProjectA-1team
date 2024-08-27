// components/ConfirmSaveModal.tsx
import React from 'react';
import { ConfirmModalProps } from '../interface/ModalProps';
import ConfirmModal from './comfirmModal';

const ConfirmSaveModal: React.FC<ConfirmModalProps> = (
  props: ConfirmModalProps,
) => {
  return <ConfirmModal {...props} message="저장하시겠습니까?" />;
};

export default ConfirmSaveModal;
