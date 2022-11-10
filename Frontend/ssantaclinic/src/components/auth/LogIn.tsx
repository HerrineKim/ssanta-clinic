import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { currentUser } from '../../store/store';
import { Button, LoginContainer } from './styles';
import { Input } from './styles';
import { motion } from 'framer-motion';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

export const LogIn = () => {
  const LOCAL = 'http://localhost:8080';
  const DOMAIN = 'https://k7a201.p.ssafy.io';
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [button, setButton] = useState<boolean>(true);
  const setUserState = useSetRecoilState(currentUser);
  const navigate = useNavigate();
  let accessToken: any = '';

  // const EventSource = EventSourcePolyfill;
  // const eventSource = new EventSource('/api/noti/sub');
  // eventSource.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   console.log(data.message);
  // };
  // eventSource.onerror = (error) => {
  //   console.log(error);
  //   eventSource.close();
  // };
  useEffect(() => {
    if (localStorage.getItem('jwt') !== '') {
      alert('로그인 했잖아요;;');
      navigate('/');
    }
  });
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('제출됨');
    axios
      .post(LOCAL + '/api/user/login', {
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
          noti: [],
        });
        const TOKEN = localStorage.getItem('jwt');
        subSSE(TOKEN);
        // navigate('/test'); // Login 성공하면 일단 내 방으로
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  function subSSE(TOKEN: any) {
    console.log('알림 구독실행');
    let eventSource: any;
    const fetchSse = async () => {
      try {
        eventSource = new EventSourcePolyfill(LOCAL + '/api/noti/sub', {
          headers: {
            Authorization: TOKEN,
          },
        });

        /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
        eventSource.onmessage = async (event: any) => {
          const res = await event.data;
          console.log(res);
        };

        /* EVENTSOURCE ONERROR ------------------------------------------------------ */
        eventSource.onerror = async (event: any) => {
          console.log(event);
        };
      } catch (error) {
        console.log(error);
      }
    };
    fetchSse();
    return () => eventSource.close();
  }

  //아이디에 '@'가 포함되어 있고, 비밀번호가 5자리 이상일 때 로그인버튼이 활성화되는 기능을 구현해 보자!
  function changeButton() {
    email.includes('@') && password.length >= 5
      ? setButton(false)
      : setButton(true);
  }
  function goSignUp() {
    navigate('/signup');
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
    <LoginContainer id="login-container">
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={email}
          placeholder="이메일"
          onChange={handleChangeEmail}
          required
          onKeyUp={changeButton}
        />
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={handleChangePassword}
          required
          onKeyUp={changeButton}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          id="login-button"
          disabled={button}
        >
          로그인
        </motion.button>
      </form>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        id="signup-button"
        onClick={goSignUp}
      >
        회원가입
      </motion.button>
    </LoginContainer>
  );
};
