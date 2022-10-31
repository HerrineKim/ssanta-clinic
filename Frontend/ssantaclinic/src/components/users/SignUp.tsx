import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { SignUpContainer } from './styles';
import { SignUpbButton } from './styles';
import { SignUpInput } from './styles';
import { CheckButton } from './styles';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080' + '/api/user/join', {
        email: email,
        password: password,
        nickName: nickname,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.jwt); // 바로 로그인
        navigate('/'); // 회원가입 성공하면 홈으로
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  };

  function checkEmail(e: any) {
    e.preventDefault();
    axios
      .get('api/user/check/email', {
        data: {
          email: email,
        },
      })
      .then((res) => {
        // 응답 값 T or F 해서 T => 중복 있음, F => 중복 없음
        if (res.data === true) {
          console.log('중복됨 다시!');
        } else {
          console.log('중복 안됨');
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function checkNickname(e: any) {
    e.preventDefault();
    axios
      .get('api/user/check/nickname', {
        data: {
          nickname: nickname,
        },
      })
      .then((res) => {
        // 응답 값 T or F 해서 T => 중복 있음, F => 중복 없음
        if (res.data === true) {
          console.log('중복됨 다시!');
        } else {
          console.log('중복 안됨');
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <SignUpContainer>
      <div id="signup">
        <h1>회원가입</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <SignUpInput
          name="email"
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <CheckButton onClick={checkEmail}>중복확인</CheckButton>
        <SignUpInput
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignUpInput
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="비밀번호 확인"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {password !== passwordConfirm && <p>비밀번호가 달라요!</p>}
        <SignUpInput
          name="Nickname"
          value={nickname}
          placeholder="닉네임"
          onChange={(e) => setNickname(e.target.value)}
        />
        <CheckButton onClick={checkNickname}>중복확인</CheckButton>
        <SignUpbButton type="submit">회원가입</SignUpbButton>
      </form>
    </SignUpContainer>
  );
};
