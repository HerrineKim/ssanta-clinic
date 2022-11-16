import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LetterContainer,
  Message,
  LetterSanta,
  ReceiveLetterContainer,
} from './styles';
import './santa.css';
import { API_BASE_URL } from '../../apis/url';
export const ReceiveLetter = (props: any) => {
  const BASE_URL = API_BASE_URL;
  const { onLetterId } = props;
  const [message, setMessage] = useState<string>('크쿠르삥뻥');
  const [title, setTitle] = useState<string>('');
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  useEffect(() => {
    console.log(onLetterId);
    axios
      .get(BASE_URL + 'letter/reply/' + onLetterId, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
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
