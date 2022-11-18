import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FindPasswordContainer, FindPasswordForm } from './styles';
import { API_BASE_URL } from '../../apis/url';
export default function FindPassword() {
  const BASE_URL = API_BASE_URL;
  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsValid(true);
    axios
      .post(BASE_URL + 'user/find/password', {
        email: email,
      })
      .then((res) => {
        // 비밀번호 찾는 url이 응답일 듯
        console.log('응답 받아옴 성공!', res.data); // 고유 번호를 받았고
        sendUrl(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  function sendUrl(UUID: string) {
    axios
      .post(BASE_URL + 'user/find/password/url', {
        email: email,
        url: BASE_URL + 'changepassword/' + UUID,
      })
      .then((res) => {
        confirm('이메일을 확인하세요');
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  }

  return (
    <FindPasswordContainer>
      <div id="find-password-text">
        <motion.h1>비밀번호 찾기 위한 이메일확인</motion.h1>
      </div>
      <FindPasswordForm onSubmit={handleSubmit}>
        <motion.input
          className="find-password-input"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          id="find-password-button"
        >
          메일 보내기
        </motion.button>
      </FindPasswordForm>
    </FindPasswordContainer>
  );
}
