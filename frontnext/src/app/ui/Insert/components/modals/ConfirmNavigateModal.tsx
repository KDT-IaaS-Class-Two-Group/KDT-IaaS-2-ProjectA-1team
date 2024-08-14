// components/ConfirmNavigateModal.tsx
import React from 'react';
import Modal from '@/app/ui/Modal-Test/modalComponent';
import button from '@/app/ui/styles/ButtonStyles';
import common from '@/app/ui/styles/CommonStyles';

interface ConfirmNavigateModalProps {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmNavigateModal: React.FC<ConfirmNavigateModalProps> = ({
  show,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">
        저장하지 않은 변경 사항이 있습니다. <br />
        저장하지 않고 나가시겠습니까?
      </h2>
      <div className="flex justify-end space-x-4">
        <button
          className={`${button.ModalButton} ${common.px} ${common.py} ${common.roundedLrage} ${common.textWhite} ${common.gray}`}
          onClick={onClose}
        >
          취소
        </button>
        <button
          className={`${button.ModalButton} ${common.px} ${common.py} ${common.roundedLrage} ${common.textWhite} ${common.blue}`}
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmNavigateModal;
