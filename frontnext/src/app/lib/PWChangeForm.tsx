'use client';

import { useState } from 'react';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState<null | boolean>(null);
  const [changeSuccess, setChangeSuccess] = useState<null | boolean>(null);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);

  const handleCheckPassword = async () => {
    try {
      const response = await fetch('http://localhost:8080/check-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: currentPassword,
        }),
      });

      const data = await response.json();
      setPasswordMatch(data.match);
    } catch (error) {
      console.error('Error checking password:', error);
    }
  };

  const handleConfirmPassword = async () => {
    await handleCheckPassword();
  };

  const handleChangePassword = async () => {
    if (newPassword.trim() === '') {
      setEmptyPasswordError(true);
      return;
    }

    setEmptyPasswordError(false);

    try {
      const response = await fetch('http://localhost:8080/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();
      setChangeSuccess(data.message === 'Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      setChangeSuccess(false);
    }
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
      <button type="button" onClick={handleConfirmPassword}>
        확인
      </button>
      {passwordMatch === true && <p>비밀번호가 일치합니다</p>}
      {passwordMatch === false && <p>비밀번호가 일치하지 않습니다</p>}

      {passwordMatch === true && (
        <div>
          <label htmlFor="new-password">변경 할 비밀번호</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            aria-label="변경 할 비밀번호"
          />
          <button type="button" onClick={handleChangePassword}>
            변경
          </button>
          {emptyPasswordError && <p>변경 할 비밀번호를 작성하지 않았습니다</p>}
          {changeSuccess === true && (
            <p>비밀번호가 성공적으로 변경되었습니다</p>
          )}
          {changeSuccess === false && !emptyPasswordError && (
            <p>비밀번호 변경에 실패했습니다</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
