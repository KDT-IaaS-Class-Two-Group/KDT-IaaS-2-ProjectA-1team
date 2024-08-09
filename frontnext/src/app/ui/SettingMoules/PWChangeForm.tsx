'use client';

import { useState, useEffect } from 'react';
import { PwChangeModalStyles as styles } from '../styles/stylesKHR';

interface PasswordCheck {
  current_password: string;
  new_password?: string;
}

const PasswordChangeForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [changeSuccess, setChangeSuccess] = useState<boolean | null>(null);
  const [emptyPasswordError, setEmptyPasswordError] = useState<boolean>(false);
  const [passwordsMatchError, setPasswordsMatchError] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChangePassword = async () => {
    if (
      currentPassword.trim() === '' ||
      newPassword.trim() === '' ||
      confirmNewPassword.trim() === ''
    ) {
      setEmptyPasswordError(true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordsMatchError(true);
      return;
    }

    setEmptyPasswordError(false);
    setPasswordsMatchError(false);

    try {
      // 비밀번호 확인 요청
      const checkResponse = await fetch(
        'http://localhost:8080/check-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            current_password: currentPassword,
          } as PasswordCheck),
        },
      );

      const checkData = await checkResponse.json();
      if (!checkData.match) {
        setPasswordMatch(false);
        return;
      }

      setPasswordMatch(true);

      // 비밀번호 변경 요청
      const changeResponse = await fetch(
        'http://localhost:8080/change-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          } as PasswordCheck),
        },
      );

      const changeData = await changeResponse.json();
      if (changeData.message === 'Password changed successfully') {
        setChangeSuccess(true);
        setTimeout(resetForm, 10000); // 10초 후에 폼 초기화
      } else {
        setChangeSuccess(false);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setChangeSuccess(false);
    }
  };

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordMatch(null);
    setChangeSuccess(null);
    setEmptyPasswordError(false);
    setPasswordsMatchError(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    if (!isModalOpen) {
      resetForm();
    }
  }, [isModalOpen]);

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="px-4 py-2 bg-green-500 text-white rounded hover:opacity-80"
      >
        비밀번호 변경
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button onClick={handleCancel} className={styles.closeButton}>
              &times;
            </button>
            <h2 className="text-xl font-semibold text-center">
              비밀번호 변경하기
            </h2>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
            >
              <div className="mt-4">
                <label htmlFor="current-password" className={styles.label}>
                  현재 비밀번호
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={styles.input}
                  aria-label="현재 비밀번호"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="new-password" className={styles.label}>
                  변경 할 비밀번호
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.input}
                  aria-label="새 비밀번호"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="confirm-new-password" className={styles.label}>
                  변경 할 비밀번호 확인
                </label>
                <input
                  id="confirm-new-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className={styles.input}
                  aria-label="새 비밀번호 확인"
                />
              </div>
              <button type="submit" className={styles.button}>
                변경하기
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={`${styles.button} mt-2 bg-red-500 hover:bg-red-600`}
              >
                취소하기
              </button>

              {emptyPasswordError && (
                <p className="text-red-500"> 모두 입력 해주세요.</p>
              )}
              {passwordsMatchError && (
                <p className="text-red-500">새 비밀번호가 일치하지 않습니다.</p>
              )}
              {passwordMatch === false && !emptyPasswordError && (
                <p className="text-red-500">
                  현재 비밀번호가 일치하지 않습니다
                </p>
              )}
              {passwordMatch === true && changeSuccess === true && (
                <p className="text-green-500">
                  비밀번호가 성공적으로 변경되었습니다
                </p>
              )}
              {changeSuccess === false && !emptyPasswordError && (
                <p className="text-red-500">비밀번호 변경에 실패했습니다</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
