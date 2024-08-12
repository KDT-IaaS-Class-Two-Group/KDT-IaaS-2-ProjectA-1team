'use client';

import { useState, useEffect } from 'react';
import TotalStyles from '../styles/TotalStyles';

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
        setTimeout(() => {
          resetForm();
          setIsModalOpen(false);
        }, 2000);
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

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setEmptyPasswordError(false);
      setPasswordsMatchError(false);
      setPasswordMatch(null);
      setChangeSuccess(null);
    };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className={TotalStyles.SettingButton}
      >
        비밀번호 변경
      </button>

      {isModalOpen && (
        <div className={TotalStyles.ModalOverlay}>
          <form
            className={TotalStyles.ModalContent}
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
          >
            <button
              type="button"
              onClick={handleCancel}
              className={TotalStyles.ModalCloseButton}
            >
              &times;
            </button>
            <h2 className={TotalStyles.PasswordSuccessText}>
              비밀번호 변경하기
            </h2>
            <div className="mt-4">
              <label
                htmlFor="current-password"
                className={TotalStyles.LoginLabel}
              >
                현재 비밀번호
              </label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={handleInputChange(setCurrentPassword)}
                className={TotalStyles.LoginInput}
                aria-label="현재 비밀번호"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="new-password" className={TotalStyles.LoginLabel}>
                새 비밀번호
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={handleInputChange(setNewPassword)}
                className={TotalStyles.LoginInput}
                aria-label="새 비밀번호"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="confirm-new-password"
                className={TotalStyles.LoginLabel}
              >
                새 비밀번호 확인
              </label>
              <input
                id="confirm-new-password"
                type="password"
                value={confirmNewPassword}
                onChange={handleInputChange(setConfirmNewPassword)}
                className={TotalStyles.LoginInput}
                aria-label="새 비밀번호 확인"
              />
            </div>
            <button type="submit" className={TotalStyles.PasswordSubmitButton}>
              변경하기
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={TotalStyles.PasswordButton}
            >
              취소하기
            </button>

            {emptyPasswordError && (
              <p className={TotalStyles.PasswordFailureText}>
                모두 입력 해주세요.
              </p>
            )}
            {passwordsMatchError && (
              <p className={TotalStyles.PasswordFailureText}>
                새 비밀번호가 일치하지 않습니다.
              </p>
            )}
            {passwordMatch === false && !emptyPasswordError && (
              <p className={TotalStyles.PasswordFailureText}>
                현재 비밀번호가 일치하지 않습니다
              </p>
            )}
            {passwordMatch === true && changeSuccess === true && (
              <p className={TotalStyles.PasswordSuccessText}>
                비밀번호가 성공적으로 변경되었습니다
              </p>
            )}
            {changeSuccess === false && !emptyPasswordError && (
              <p className={TotalStyles.PasswordFailureText}>
                비밀번호 변경에 실패했습니다
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
