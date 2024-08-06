'use client';

import { useState } from 'react';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState<null | boolean>(null);

  const handleCheckPassword = async () => {
    try {
      const response = await fetch('http://localhost:8000/check-password', {
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
    </div>
  );
};

export default PasswordChangeForm;
