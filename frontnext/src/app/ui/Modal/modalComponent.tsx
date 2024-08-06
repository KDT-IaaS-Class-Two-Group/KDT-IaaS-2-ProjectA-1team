// components/Modal.tsx
import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const styles = {
  modalOverlay:
    'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50',
  modalContent: 'bg-white p-6 rounded-lg relative max-w-lg w-full mx-4',
  closeButton: 'absolute top-2 right-2 text-gray-500 hover:text-gray-700',
};

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
