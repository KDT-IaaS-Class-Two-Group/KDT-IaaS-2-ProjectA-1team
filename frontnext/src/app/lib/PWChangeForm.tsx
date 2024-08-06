'use client';

import { useState } from 'react';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState<null | boolean>(null);
  const [changeSuccess, setChangeSuccess] = useState<null | boolean>(null);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);

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
          }),
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
          }),
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
    // 입력 필드 초기화
    setCurrentPassword('');
    setNewPassword('');
    setPasswordMatch(null);
    setChangeSuccess(null);
    setEmptyPasswordError(false);
  };

  return (
    <div>
      <label htmlFor="current-password">현재 비밀번호</label>
      <input
        id="current-password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        aria-label="현재 비밀번호"
      />

      <label htmlFor="new-password">변경 할 비밀번호</label>
      <input
        id="new-password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        aria-label="변경 할 비밀번호"
      />

      <button type="button" onClick={handleChangePassword}>
        변경하기
      </button>
      <button type="button" onClick={handleCancel}>
        취소하기
      </button>

      {emptyPasswordError && <p>모든 비밀번호 필드를 작성해야 합니다.</p>}
      {passwordMatch === false && !emptyPasswordError && (
        <p>현재 비밀번호가 일치하지 않습니다</p>
      )}
      {passwordMatch === true && changeSuccess === true && (
        <p>비밀번호가 성공적으로 변경되었습니다</p>
      )}
      {changeSuccess === false && !emptyPasswordError && (
        <p>비밀번호 변경에 실패했습니다</p>
      )}
    </div>
  );
};

export default PasswordChangeForm;
