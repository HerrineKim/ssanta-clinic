import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LetterContainer,
  Message,
  LetterSanta,
  ReceiveLetterContainer,
} from './styles';
import './santa.css';

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
    <LetterContainer id="receive-letter-container">
      <ReceiveLetterContainer id="receive-message-container">
        <Message id="message">{message}</Message>
      </ReceiveLetterContainer>
      <LetterSanta className="window">
        <div className="santa">
          <div className="head">
            <div className="face">
              <div className="redhat">
                <div className="whitepart"></div>
                <div className="redpart"></div>
                <div className="hatball"></div>
              </div>
              <div className="eyes"></div>
              <div className="beard">
                <div className="nouse"></div>
                <div className="mouth"></div>
              </div>
            </div>
            <div className="ears"></div>
          </div>
          <div className="body"></div>
        </div>
      </LetterSanta>
    </LetterContainer>
  );
};
