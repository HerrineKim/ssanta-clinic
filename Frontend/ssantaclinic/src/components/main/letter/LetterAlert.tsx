import React, { useState } from 'react';
import { Div } from './styles';
import { LetterList } from '../../letter/LetterList';
import { WriteLetterPage } from '../../../pages/letter/WriteLetterPage';
import { ReceiveLetterPage } from '../../../pages/letter/ReceiveLetterPage';
import { Button } from './styles';

export function LetterAlert() {
  const [isList, setIsList] = useState<boolean>(true);
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [isReceive, setIsCristmasSelect] = useState<boolean>(false);
  function write() {
    setIsWrite(true);
  }
  function Write() {
    setIsList(!isList);
    setIsWrite(!isWrite);
  }
  const setList = () => {
    if (!isList) {
      setIsList(!isList);
      if (isWrite) {
        setIsWrite(!isWrite);
      }
      if (isReceive) {
        setIsCristmasSelect(!isReceive);
      }
    }
  };

  const setWrite = () => {
    if (!isWrite) {
      setIsWrite(!isWrite);
      if (isList) {
        setIsList(!isList);
      }
      if (isReceive) {
        setIsCristmasSelect(!isReceive);
      }
    }
  };
  const setReceive = () => {
    if (!isReceive) {
      setIsCristmasSelect(!isReceive);

      if (isList) {
        setIsList(!isList);
      }
      if (isWrite) {
        setIsWrite(!isWrite);
      }
    }
  };
  if (isList) {
    return (
      <Div className="letterAlert">
        <LetterList></LetterList>;
        <div>
          <Button onClick={Write}>편지쓰기</Button>
        </div>
      </Div>
    );
  } else if (isWrite) {
    return (
      <Div className="letterAlert">
        <WriteLetterPage onClose={setIsWrite}></WriteLetterPage>
      </Div>
    );
  } else if (isReceive) {
    return (
      <Div className="letterAlert">
        <ReceiveLetterPage></ReceiveLetterPage>
      </Div>
    );
  } else {
    return (
      <Div className="letterAlert">
        <LetterList></LetterList>
      </Div>
    );
  }
}
