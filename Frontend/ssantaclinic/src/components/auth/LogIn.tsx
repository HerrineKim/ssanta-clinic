import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { currentUser, isValidLogIn } from '../../store/store';
import { LoginContainer } from './styles';
import { Input } from './styles';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../apis/url';
export const LogIn = () => {
  const BASE_URL = API_BASE_URL;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [button, setButton] = useState<boolean>(true);
  const setUserState = useSetRecoilState(currentUser);
  const setIsValidLogin = useSetRecoilState(isValidLogIn);
  const [isFail, setIsFail] = useState<boolean>(false);
  const navigate = useNavigate();

  let accessToken: any = '';

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('제출됨');
    axios
      .post(BASE_URL + 'user/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsValidLogin({
          isValidLogin: true,
        });
        // console.log(res.data);
        accessToken = res.headers.authorization;
        localStorage.setItem('jwt', accessToken);
        setTimeout(() => {
          setUserState({
            email: email,
            id: res.data.userId,
            nickname: res.data.nickName,
            noti: [],
            isLogin: true,
          });
        }, 8000);

        // navigate('/logintohome');
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response.status === 401) {
          setIsFail(true);
          setTimeout(() => {
            setIsFail(false);
          }, 5000);
        }
      });
  };

  //아이디에 '@'가 포함되어 있고, 비밀번호가 5자리 이상일 때 로그인버튼이 활성화되는 기능을 구현해 보자!
  function changeButton() {
    email.includes('@') && password.length >= 5
      ? setButton(false)
      : setButton(true);
  }
  function goSignUp() {
    navigate('/signup');
  }
  function goFindPassword() {
    navigate('/findpassword');
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
        {!email.includes('@') && (
          <p style={{ color: 'red' }}>이메일 형식이 아닙니다.</p>
        )}
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={handleChangePassword}
          required
          onKeyUp={changeButton}
        />
        {password.length < 5 && (
          <p style={{ color: 'red' }}>비밀번호가 너무 짧습니다.</p>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          id="login-button"
          disabled={button}
        >
          로그인
        </motion.button>
        {isFail ? (
          <p style={{ color: 'red', marginTop: '10px' }}>
            이메일 혹은 아이디가 잘못 되었습니다.
          </p>
        ) : null}
      </form>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        id="signup-button"
        onClick={goSignUp}
      >
        회원가입
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        id="find-password-button"
        onClick={goFindPassword}
      >
        비밀번호 찾기
      </motion.button>
    </LoginContainer>
  );
};
