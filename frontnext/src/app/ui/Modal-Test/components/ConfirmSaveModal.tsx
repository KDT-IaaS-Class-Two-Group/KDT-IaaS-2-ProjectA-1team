// components/ConfirmSaveModal.tsx
import React from 'react';
import { ModalStyles } from '../styles/ModalStyles';

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
  if (!show) {
    return null;
  }

  return (
    <div className={ModalStyles.modalOverlay}>
      <div className={ModalStyles.modalContent}>
        <h2 className="text-lg font-bold mb-4">저장하시겠습니까?</h2>
        <div className="flex justify-end space-x-4">
          <button
            className={`${ModalStyles.button} ${ModalStyles.cancelButton}`}
            onClick={onClose}
          >
            취소
          </button>
          <button
            className={`${ModalStyles.button} ${ModalStyles.confirmButton}`}
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSaveModal;
