import React, { useState } from 'react';

import { callApi } from '@/app/lib/AJAX';

const LoginFormSection = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div>
        <form onSubmit={}>
          <div>
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              name="id"
              placeholder="id를 입력하세요"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="password를 입력하세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginFormSection;
