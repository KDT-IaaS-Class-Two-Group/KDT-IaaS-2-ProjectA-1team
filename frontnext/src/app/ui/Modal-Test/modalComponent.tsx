// components/Modal.tsx
import React from 'react';
import TotalStyles from '../styles/total-styles';

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
    <div className={TotalStyles.ModalOverlay}>
      <div className={TotalStyles.ModalContent}>
        <button className={TotalStyles.ModalCloseButton} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
