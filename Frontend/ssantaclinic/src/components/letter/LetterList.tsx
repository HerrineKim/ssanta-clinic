import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LetterListContainer } from './styles';
import { motion } from 'framer-motion';

export const LetterList = (props: any) => {
  const ACCESS_TOKEN = `${localStorage.getItem('jwt')}`;

  const { onLetters, onLetterId, onReceiveLetter, onLetterList } = props;

  function Letter({ letter }: { letter: any }) {
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
        <b className="letter-title">{letter.title}</b>
      </motion.div>
    );
  }

  return (
    <LetterListContainer id="receive-letter-container">
      {onLetters.map((letter: any, index: any) => (
        <Letter letter={letter} key={index} />
      ))}
    </LetterListContainer>
  );
};
