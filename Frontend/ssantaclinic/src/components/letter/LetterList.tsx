import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LetterListContainer } from './styles';
import { motion } from 'framer-motion';

export const LetterList = (props: any) => {
  const ACCESS_TOKEN = `${localStorage.getItem('jwt')}`;
  const [letters, setLetters] = useState<any[]>([]);

  const { onLetterId, onReceiveLetter, onLetterList } = props;

  useEffect(() => {
    console.log(letters, '편지들');
    getLetters();
  }, []);

  function Letter({ letter }: { letter: any }) {
    console.log(letter, '편지 하나');
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        id="letterbox"
        onClick={() => {
          onLetterId(letter.replyLetterid);
          onReceiveLetter(true);
          onLetterList(false);
        }}
      >
        <b>{letter.title}</b>
      </motion.div>
    );
  }

  function getLetters() {
    axios
      .get('http://localhost:8080' + '/api/letter', {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        const data = res.data.reply;
        for (let i = 0; i < data.length; i++) {
          letters.push({
            replyLetterid: data[i].replyLetterId,
            sendLetterId: data[i].sendLetterId,
            title: data[i].title,
            message: data[i].message,
            isRead: data[i].isRead,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <LetterListContainer id="receive-letter-container">
      {letters.map((letter: any, index: any) => (
        <Letter letter={letter} key={index} />
      ))}
    </LetterListContainer>
  );
};
