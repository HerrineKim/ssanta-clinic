import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { SignUpContainer, SignUpForm, SignUpInputs } from './styles';
// import { Input } from './styles';
// import { CheckButton } from './styles';

import { motion } from 'framer-motion';

import { API_BASE_URL } from '../../apis/url';
export const SignUp = () => {
  const BASE_URL = API_BASE_URL;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [emailDuplicated, setEmailDuplicated] = useState<boolean>(true);
  const [nickNameDuplicated, setNickNameDuplicated] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .post(BASE_URL + 'user/join', {
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
        console.log(email);
      });
  };

  function checkEmail(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    console.log(email);
    axios
      .post(BASE_URL + 'user/check/email', {
        email: email,
      })
      .then((res) => {
        // true면 중복이라는 얘기
        if (res.data.duplicated) {
          alert('중복입니다');
        } else {
          alert('중복된 이메일이 없습니다!');
          setEmailDuplicated(false);
          if (!emailDuplicated && !nickNameDuplicated) {
            setIsValid(true);
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  function checkNickname(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    axios
      .post(BASE_URL + 'user/check/nickname', {
        nickName: nickname,
      })
      .then((res) => {
        if (res.data.duplicated) {
          alert('중복입니다');
        } else {
          alert('중복된 닉네임이 없습니다!');
          setNickNameDuplicated(false);
          if (!emailDuplicated && !nickNameDuplicated) {
            setIsValid(true);
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
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
  const handleChangePasswordFirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);
    },
    [],
  );
  const handleChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    [],
  );
  return (
    <SignUpContainer>
      <div id="signup">
        <motion.h1
          id="signup-text"
          animate={{ fontSize: 50, color: '#ffffff', y: -7 }}
        >
          회원가입
        </motion.h1>
      </div>
      <motion.div
        id="signup-form-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpInputs>
            <motion.input
              className="signup-input"
              name="email"
              value={email}
              placeholder="이메일"
              onChange={handleChangeEmail}
              required
            />
            <motion.button
              className="check-button"
              onClick={checkEmail}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              중복확인
            </motion.button>
            <motion.input
              className="signup-input"
              type="password"
              name="password"
              value={password}
              placeholder="비밀번호"
              onChange={handleChangePassword}
              required
            />
            <motion.input
              className="signup-input"
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              placeholder="비밀번호 확인"
              onChange={handleChangePasswordFirm}
              required
            />
            {password !== passwordConfirm && (
              <p style={{ color: 'red' }}>비밀번호가 달라요!</p>
            )}
            <motion.input
              className="signup-input"
              // initial={{opacity=}}
              name="Nickname"
              value={nickname}
              placeholder="닉네임"
              onChange={handleChangeNickname}
              required
            />
            <motion.button
              className="check-button"
              onClick={checkNickname}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              중복확인
            </motion.button>
            <div style={{ display: 'flex' }}>
              <motion.button
                style={{ marginRight: '10px' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                id="signup-button"
                disabled={isValid}
                onClick={handleSubmit}
              >
                회원가입
              </motion.button>
              <motion.button
                style={{ marginLeft: '10px' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                id="signup-button"
                disabled={isValid}
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </motion.button>
            </div>
          </SignUpInputs>
        </SignUpForm>
      </motion.div>
    </SignUpContainer>
  );
};
