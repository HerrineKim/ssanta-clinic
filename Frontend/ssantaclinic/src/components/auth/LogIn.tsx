import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { currentUser } from '../../store/store';

export const LogIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [button, setButton] = useState<boolean>(true);
  const setUserState = useSetRecoilState(currentUser);
  const navigate = useNavigate();
  let accessToken: any = '';

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('제출됨');
    axios
      .post('http://localhost:8080' + '/api/user/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        accessToken = res.headers.authorization;
        localStorage.setItem('jwt', accessToken);
        setUserState({
          email: email,
          id: res.data.userId,
          nickname: res.data.nickName,
        });
        navigate('/room'); // Login 성공하면 일단 내 방으로
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

  const handleChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [],
  );
  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [],
  );
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
          onChange={handleChangeEmail}
          required
          onKeyUp={changeButton}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={handleChangePassword}
          required
          onKeyUp={changeButton}
        />
        <button type="submit" className="loginButton" disabled={button}>
          로그인
        </button>
      </form>
    </div>
  );
};
