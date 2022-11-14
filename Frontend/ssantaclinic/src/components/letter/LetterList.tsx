import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './styles';
import { useNavigate } from 'react-router-dom';

export const LetterList = (props: any) => {
  const { onLetterId, onReceiveLetter, onLetterList } = props;
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const navigate = useNavigate();
  const letters = [
    {
      id: 1,
      title: '견뎌',
      message: '그것도 못해?,',
    },
    {
      id: 2,
      title: '참아',
      message: '다른 사람 다해',
    },
  ];
  function Letter({ letter }: { letter: any }) {
    return (
      <button
        onClick={() => {
          onLetterId(letter.id);
          onReceiveLetter(true);
          onLetterList(false);
        }}
      >
        <b>{letter.title}</b> <span>{letter.message}</span>
      </button>
    );
  }
  useEffect(() => {
    axios
      .get('http://localhost:8080' + '/api/letter', {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  });
  return (
    <div id="receive-letter-container">
      {letters.map((letter, index) => (
        <Letter letter={letter} key={index} />
      ))}
    </div>
  );
};
