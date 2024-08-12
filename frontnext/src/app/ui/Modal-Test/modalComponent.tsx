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
    <div className={TotalStyles.modalOverlay}>
      <div className={TotalStyles.modalContent}>
        <button className={TotalStyles.closeButton} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
