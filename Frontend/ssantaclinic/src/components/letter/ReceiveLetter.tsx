import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LetterContainer, Message } from './styles';

export const ReceiveLetter = () => {
  const [message, setMessage] = useState<string>('크쿠르삥뻥');
  const [title, setTitle] = useState<string>('');
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  useEffect(() => {
    axios
      .get('http://localhost:8080' + '/api/letter', {
        params: {
          letterId: 'letterId', // 나중에 Token으로 가져오면 될 듯
        },
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage('산타에게서 온 답장');
        setTitle('편지 제목');
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  });

  return (
    <LetterContainer id="write-letter-container">
      <div id="message-container">
        <Message id="message">
          <p>{message}</p>
        </Message>
      </div>
    </LetterContainer>
  );
};
