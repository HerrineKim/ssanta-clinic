import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { SignUpContainer, SignUpForm, SignUpInputs } from './styles';
import { Input } from './styles';
import { CheckButton } from './styles';

import { motion } from 'framer-motion';
export const SignUp = () => {
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
        console.log(email);
      });
  };

  function checkEmail(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    console.log(email);
    axios
      .post('http://localhost:8080' + '/api/user/check/email', {
        email: email,
      })
      .then((res) => {
        // true면 중복이라는 얘기
        if (res.data.duplicated) {
          alert('중복입니다');
        } else {
          alert('말복입니다 통과~');
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
      .post('http://localhost:8080' + '/api/user/check/nickname', {
        nickName: nickname,
      })
      .then((res) => {
        if (res.data.duplicated) {
          alert('중복입니다');
        } else {
          alert('말복입니다 통과~');
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
        <motion.h1 animate={{ fontSize: 50, color: '#ffffff', y: -7 }}>
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
            <motion.button className="check-button" onClick={checkEmail}>
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
            {password !== passwordConfirm && <p>비밀번호가 달라요!</p>}
            <motion.input
              className="signup-input"
              // initial={{opacity=}}
              name="Nickname"
              value={nickname}
              placeholder="닉네임"
              onChange={handleChangeNickname}
              required
            />
            <motion.button className="check-button" onClick={checkNickname}>
              중복확인
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              id="signup-button"
              disabled={isValid}
            >
              회원가입
            </motion.button>
          </SignUpInputs>
        </SignUpForm>
      </motion.div>
    </SignUpContainer>
  );
};
