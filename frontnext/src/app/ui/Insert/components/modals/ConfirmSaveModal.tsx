// components/ConfirmSaveModal.tsx
import React from 'react';
import Modal from '@/app/ui/Modal-Test/modalComponent';
import { closeButton, confirmButton } from '@/app/ui/styles/ButtonStyles';

interface ConfirmSaveModalProps {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmSaveModal: React.FC<ConfirmSaveModalProps> = ({
  show,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">저장하시겠습니까?</h2>
      <div className="flex justify-end space-x-4">
        <button className={closeButton} onClick={onClose}>
          취소
        </button>
        <button className={confirmButton} onClick={onConfirm}>
          확인
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmSaveModal;
