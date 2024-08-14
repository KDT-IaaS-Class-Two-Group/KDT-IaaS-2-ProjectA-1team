'use client';

import { useState, useEffect } from 'react';
import TotalStyles from '../styles/TotalStyles';
import { useLanguage } from '../SettingMoules/LanguageContext';

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

  const { language } = useLanguage();

  const texts = {
    ko: {
      changePassword: '비밀번호 변경',
      currentPassword: '현재 비밀번호',
      newPassword: '새 비밀번호',
      confirmNewPassword: '새 비밀번호 확인',
      submit: '변경하기',
      cancel: '취소하기',
      emptyPasswordError: '모두 입력 해주세요.',
      passwordsMatchError: '새 비밀번호가 일치하지 않습니다.',
      passwordMatchError: '현재 비밀번호가 일치하지 않습니다.',
      success: '비밀번호가 성공적으로 변경되었습니다.',
      failure: '비밀번호 변경에 실패했습니다.',
    },
    en: {
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      submit: 'Submit',
      cancel: 'Cancel',
      emptyPasswordError: 'Please fill out all fields.',
      passwordsMatchError: 'New passwords do not match.',
      passwordMatchError: 'Current password does not match.',
      success: 'Password changed successfully.',
      failure: 'Failed to change password.',
    },
    jp: {
      changePassword: 'パスワードを変更する',
      currentPassword: '現在のパスワード',
      newPassword: '新しいパスワード',
      confirmNewPassword: '新しいパスワードを確認する',
      submit: '変更する',
      cancel: 'キャンセル',
      emptyPasswordError: 'すべてのフィールドに入力してください。',
      passwordsMatchError: '新しいパスワードが一致しません。',
      passwordMatchError: '現在のパスワードが一致しません。',
      success: 'パスワードが正常に変更されました。',
      failure: 'パスワードの変更に失敗しました。',
    },
    cn: {
      changePassword: '更改密码',
      currentPassword: '当前密码',
      newPassword: '新密码',
      confirmNewPassword: '确认新密码',
      submit: '更改',
      cancel: '取消',
      emptyPasswordError: '请填写所有字段。',
      passwordsMatchError: '新密码不匹配。',
      passwordMatchError: '当前密码不匹配。',
      success: '密码更改成功。',
      failure: '更改密码失败。',
    },
    vn: {
      changePassword: 'Thay đổi mật khẩu',
      currentPassword: 'Mật khẩu hiện tại',
      newPassword: 'Mật khẩu mới',
      confirmNewPassword: 'Xác nhận mật khẩu mới',
      submit: 'Thay đổi',
      cancel: 'Hủy bỏ',
      emptyPasswordError: 'Vui lòng điền đầy đủ các trường.',
      passwordsMatchError: 'Mật khẩu mới không khớp.',
      passwordMatchError: 'Mật khẩu hiện tại không khớp.',
      success: 'Đổi mật khẩu thành công.',
      failure: 'Thay đổi mật khẩu thất bại.',
    },
    th: {
      changePassword: 'เปลี่ยนรหัสผ่าน',
      currentPassword: 'รหัสผ่านปัจจุบัน',
      newPassword: 'รหัสผ่านใหม่',
      confirmNewPassword: 'ยืนยันรหัสผ่านใหม่',
      submit: 'เปลี่ยนรหัสผ่าน',
      cancel: 'ยกเลิก',
      emptyPasswordError: 'กรุณากรอกข้อมูลให้ครบทุกช่อง.',
      passwordsMatchError: 'รหัสผ่านใหม่ไม่ตรงกัน.',
      passwordMatchError: 'รหัสผ่านปัจจุบันไม่ตรงกัน.',
      success: 'เปลี่ยนรหัสผ่านสำเร็จ.',
      failure: 'การเปลี่ยนรหัสผ่านล้มเหลว.',
    },
  };

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
    <>
      <button
        type="button"
        onClick={openModal}
        className={TotalStyles.SettingButton}
      >
        {texts[language].changePassword}
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
              {texts[language].changePassword}
            </h2>
            <div className="mt-4">
              <label
                htmlFor="current-password"
                className={TotalStyles.LoginLabel}
              >
                {texts[language].currentPassword}
              </label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={handleInputChange(setCurrentPassword)}
                className={TotalStyles.LoginInput}
                aria-label={texts[language].currentPassword}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="new-password" className={TotalStyles.LoginLabel}>
                {texts[language].newPassword}
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={handleInputChange(setNewPassword)}
                className={TotalStyles.LoginInput}
                aria-label={texts[language].newPassword}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="confirm-new-password"
                className={TotalStyles.LoginLabel}
              >
                {texts[language].confirmNewPassword}
              </label>
              <input
                id="confirm-new-password"
                type="password"
                value={confirmNewPassword}
                onChange={handleInputChange(setConfirmNewPassword)}
                className={TotalStyles.LoginInput}
                aria-label={texts[language].confirmNewPassword}
              />
            </div>
            <button type="submit" className={TotalStyles.PasswordSubmitButton}>
              {texts[language].submit}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={TotalStyles.PasswordButton}
            >
              {texts[language].cancel}
            </button>

            {emptyPasswordError && (
              <p className={TotalStyles.PasswordFailureText}>
                {texts[language].emptyPasswordError}
              </p>
            )}
            {passwordsMatchError && (
              <p className={TotalStyles.PasswordFailureText}>
                {texts[language].passwordsMatchError}
              </p>
            )}
            {passwordMatch === false && !emptyPasswordError && (
              <p className={TotalStyles.PasswordFailureText}>
                {texts[language].passwordMatchError}
              </p>
            )}
            {passwordMatch === true && changeSuccess === true && (
              <p className={TotalStyles.PasswordSuccessText}>
                {texts[language].success}
              </p>
            )}
            {changeSuccess === false && !emptyPasswordError && (
              <p className={TotalStyles.PasswordFailureText}>
                {texts[language].failure}
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default PasswordChangeForm;
