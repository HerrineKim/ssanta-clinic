import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ReceiveLetter = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080' + '/api/letter', {
        params: {
          letterId: 'letterId', // 나중에 Token으로 가져오면 될 듯
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
      <div>
        <h1>산타가 답장해 줬어!</h1>
      </div>
      <div>
        <h2>호호호</h2>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};
