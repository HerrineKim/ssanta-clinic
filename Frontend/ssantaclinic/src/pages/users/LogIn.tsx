import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LogIn.css';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('제출됨');
    axios
      .post('api/user/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log('응답 받아옴 성공!');
        localStorage.setItem('token', res.data.jwt); // 토큰 저장
        navigate('/'); // Login 성공하면 홈으로
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //아이디에 '@'가 포함되어 있고, 비밀번호가 5자리 이상일 때 로그인버튼이 활성화되는 기능을 구현해 보자!
  function changeButton() {
    email.includes('@') && password.length >= 5
      ? setButton(false)
      : setButton(true);
  }
  return (
    <div id="login-container">
      <div id="login">
        <h1>로그인</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
          onKeyUp={changeButton}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={changeButton}
        />
        <button type="submit" className="loginButton" disabled={button}>
          로그인
        </button>
      </form>
    </div>
  );
}
