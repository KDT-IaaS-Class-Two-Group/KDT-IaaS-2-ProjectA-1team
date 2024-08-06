'use client'; // 이 줄을 추가합니다

import { useState } from 'react';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/change-password', {
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
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="current-password">현재 비밀번호</label>
        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          aria-label="현재 비밀번호"
        />
      </div>
      <div>
        <label htmlFor="new-password">변경 할 비밀번호</label>
        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          aria-label="변경 할 비밀번호"
        />
      </div>
      <button type="submit">변경</button>
    </form>
  );
};

export default PasswordChangeForm;
