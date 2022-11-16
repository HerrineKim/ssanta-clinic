import React, { useState, useEffect } from 'react';
import { Div, TitleLetterContainer, ButtonLetterContainer } from './styles';
import { LetterList } from '../../letter/LetterList';
import { WriteLetterPage } from '../../../pages/letter/WriteLetterPage';
import { ReceiveLetterPage } from '../../../pages/letter/ReceiveLetterPage';
import { motion } from 'framer-motion';
import axios from 'axios';

export interface ILetters {
  title: string;
  message: string;
  read: boolean;
  replyLetterId: number;
  sendLetterId: number;
}
export function LetterAlert() {
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const [isList, setIsList] = useState<boolean>(true);
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [isReceive, setIsReceive] = useState<boolean>(false);
  const [letterId, setLetterId] = useState<number>(0);
  const [letters, setLetters] = useState<any[]>([]);

  // useEffect(() => {
  //   console.log(letters, '편지들');
  //   getLetters();
  // }, []);
  // function getLetters() {
  //   axios
  //     .get('http://localhost:8080' + '/api/letter', {
  //       headers: {
  //         Authorization: ACCESS_TOKEN,
  //       },
  //     })
  //     .then((res) => {
  //       const data = res.data.reply;
  //       for (let i = 0; i < data.length; i++) {
  //         letters.push({
  //           replyLetterid: data[i].replyLetterId,
  //           sendLetterId: data[i].sendLetterId,
  //           title: data[i].title,
  //           message: data[i].message,
  //           isRead: data[i].isRead,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // }
  function Write() {
    setIsList(!isList);
    setIsWrite(!isWrite);
  }
  function Close() {
    setIsList(false);
    setIsWrite(false);
    setIsReceive(false);
    setTimeout(() => {
      setIsList(true);
    }, 1500);
  }
  if (isList) {
    return (
      <Div className="letterAlert">
        <TitleLetterContainer>
          <h1>산타편지</h1>
        </TitleLetterContainer>
        <LetterList
          // onLetters={set}
          onLetterId={setLetterId}
          onReceiveLetter={setIsReceive}
          onLetterList={setIsList}
        ></LetterList>
        <ButtonLetterContainer>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={Write}
          >
            편지쓰기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            id="close-button"
            onClick={Close}
          >
            나가기
          </motion.button>
        </ButtonLetterContainer>
      </Div>
    );
  } else if (isWrite) {
    return (
      <Div className="letterAlert">
        <WriteLetterPage
          onBack={setIsWrite}
          goList={setIsList}
        ></WriteLetterPage>
      </Div>
    );
  } else if (isReceive) {
    return (
      <Div className="letterAlert">
        <ReceiveLetterPage
          onLetterId={letterId}
          onBack={setIsReceive}
          goList={setIsList}
        ></ReceiveLetterPage>
      </Div>
    );
  } else {
    return null;
  }
}
