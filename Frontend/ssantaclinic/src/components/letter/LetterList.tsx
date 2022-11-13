import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './styles';
import { useNavigate } from 'react-router-dom';

export const LetterList = () => {
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080' + '/api/letter', {
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
    <div id="receive-letter-container">
      <p>리스트</p>
    </div>
  );
};
