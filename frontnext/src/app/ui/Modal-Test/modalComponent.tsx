// components/Modal.tsx
import React from 'react';
import TotalStyles from '../styles/TotalStyles';
import button from '../styles/ButtonStyles';
import common from '@/app/ui/styles/CommonStyles';

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
        <button
          className={`${button.ModalCloseButton} ${common.absolute} ${common.textGray}`}
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
