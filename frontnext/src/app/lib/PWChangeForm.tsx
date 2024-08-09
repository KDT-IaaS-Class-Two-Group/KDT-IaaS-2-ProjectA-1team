'use client';

import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { PwChangeModalStyles as styles } from '../ui/Modal-Test/styles/PWcheangeModal';
=======
import { PwChangeModalStyles as styles } from '../ui/styles/stylesKHR';
>>>>>>> upstream/main

interface PasswordCheck {
  current_password: string;
  new_password?: string;
}

const PasswordChangeForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [changeSuccess, setChangeSuccess] = useState<boolean | null>(null);
  const [emptyPasswordError, setEmptyPasswordError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChangePassword = async () => {
    if (currentPassword.trim() === '' || newPassword.trim() === '') {
      setEmptyPasswordError(true);
      return;
    }

    setEmptyPasswordError(false);

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
      setChangeSuccess(changeData.message === 'Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      setChangeSuccess(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setPasswordMatch(null);
    setChangeSuccess(null);
    setEmptyPasswordError(false);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentPassword('');
      setNewPassword('');
      setPasswordMatch(null);
      setChangeSuccess(null);
      setEmptyPasswordError(false);
    }
  }, [isModalOpen]);

  return (
    <div className={styles.container}>
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
                  aria-label="변경 할 비밀번호"
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
