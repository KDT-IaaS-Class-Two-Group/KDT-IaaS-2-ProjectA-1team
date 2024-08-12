// components/ConfirmSaveModal.tsx
import React from 'react';
import Modal from '@/app/ui/Modal-Test/modalComponent';
import TotalStyles from '@/app/ui/styles/TotalStyles';

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
      <h2 className="text-lg font-bold mb-4">정말로 저장하시겠습니까?</h2>
      <div className="flex justify-end space-x-4">
        <button
          className={`${TotalStyles.ModalButton} ${TotalStyles.ModalCancelButton}`}
          onClick={onClose}
        >
          취소
        </button>
        <button
          className={`${TotalStyles.ModalButton} ${TotalStyles.ModalConfirmButton}`}
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmSaveModal;
