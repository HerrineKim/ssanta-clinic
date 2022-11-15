import React, { useState } from 'react';
import { Div, TitleLetterContainer, ButtonLetterContainer } from './styles';
import { LetterList } from '../../letter/LetterList';
import { WriteLetterPage } from '../../../pages/letter/WriteLetterPage';
import { ReceiveLetterPage } from '../../../pages/letter/ReceiveLetterPage';
import { motion } from 'framer-motion';
export function LetterAlert() {
  const [isList, setIsList] = useState<boolean>(true);
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [isReceive, setIsReceive] = useState<boolean>(false);
  const [letterId, setLetterId] = useState<number>(0);
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
          onBack={setIsReceive}
          goList={setIsList}
        ></ReceiveLetterPage>
      </Div>
    );
  } else {
    return null;
  }
}
