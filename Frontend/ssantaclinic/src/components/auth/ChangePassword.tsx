import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/url';
export function ChangePassword() {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const BASE_URL = API_BASE_URL;
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .patch(BASE_URL + 'api/user/find/password/update', {
        password: password,
      })
      .then((res) => {
        console.log('응답 받아옴 비밀번호 변경 성공!', res.data);
        confirm('비밀번호 변경 성공');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div id="change-password-container">
      <div id="change-password">
        <h1>비밀번호 변경</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="비밀번호 확인"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {password !== passwordConfirm && <p>비밀번호가 달라요!</p>}
        <input type="submit" />
      </form>
    </div>
  );
}
