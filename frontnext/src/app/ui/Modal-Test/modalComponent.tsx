// components/Modal.tsx
import React from 'react';
import { ModalStyles } from './styles/ModalStyles';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={ModalStyles.modalOverlay}>
      <div className={ModalStyles.modalContent}>
        <button className={ModalStyles.closeButton} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
