import React, { Fragment, useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { selectUserNickname, selectUserId } from '../../store/store';
import { useRecoilValue } from 'recoil';
import { LetterContainer, Button, MessageInput, SendAlertDiv } from './styles';
import { API_BASE_URL } from '../../apis/url';
import { motion } from 'framer-motion';
// import './paper.scss';
type Keyword = 'WORK' | 'STUDY' | 'CHRISTMAS';

export const WriteLetter = (props: any) => {
  const { onBack, goList } = props;
  const BASE_URL = API_BASE_URL;
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('테스트');
  const [button, setButton] = useState<boolean>(true);
  const [isJobSelect, setIsJobSelect] = useState<boolean>(true);
  const [isFutureSelect, setIsFutureSelect] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isChristmasSelect, setIsCristmasSelect] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<Keyword>('WORK');
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const ID = useRecoilValue(selectUserId);
  const NICNAME = useRecoilValue(selectUserNickname);
  const navigate = useNavigate();
  const inputValue = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        BASE_URL + 'letter',
        {
          title: title,
          message: message,
          type: keyword,
        },
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      )
      .then((res) => {
        setIsSend(true);
        // console.log('응답 받아옴 성공!', res.data);
        setTimeout(() => {
          setIsSend(false);
          setMessage('');
          if (inputValue.current !== null) {
            inputValue.current.value = '';
          }
        }, 2000);
        // LetterList로 가는 코드 추가
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  };
  const toggleJob = () => {
    if (!isJobSelect) {
      setIsJobSelect(!isJobSelect);
      if (isFutureSelect) {
        setIsFutureSelect(!isFutureSelect);
      }
      if (isChristmasSelect) {
        setIsCristmasSelect(!isChristmasSelect);
      }
      setKeyword('WORK');
    }
  };

  const toggleFuture = () => {
    if (!isFutureSelect) {
      setIsFutureSelect(!isFutureSelect);
      if (isJobSelect) {
        setIsJobSelect(!isJobSelect);
      }
      if (isChristmasSelect) {
        setIsCristmasSelect(!isChristmasSelect);
      }
      setKeyword('STUDY');
    }
  };
  const toggleCristmas = () => {
    if (!isChristmasSelect) {
      setIsCristmasSelect(!isChristmasSelect);

      if (isJobSelect) {
        setIsJobSelect(!isJobSelect);
      }
      if (isFutureSelect) {
        setIsFutureSelect(!isFutureSelect);
        setKeyword('CHRISTMAS');
      }
    }
  };
  function changeButton() {
    message.length >= 10 ? setButton(false) : setButton(true);
  }
  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );
  const handleChangeMessage = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    },
    [],
  );

  return (
    <Fragment>
      {isSend && <SendAlertDiv>보내기 성공!</SendAlertDiv>}
      <LetterContainer id="write-letter-container">
        <input id="message-title" onChange={handleChangeTitle} type="text" />
        <div id="header">
          <h1 id="header-text">어떤 고민이 있나요?</h1>
        </div>
        <div id="set-category">
          {isJobSelect === true ? (
            <motion.button
              id="check-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleJob}
            >
              취업
            </motion.button>
          ) : (
            <motion.button
              id="non-check-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleJob}
            >
              취업
            </motion.button>
          )}
          {isFutureSelect === true ? (
            <motion.button
              id="check-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFuture}
            >
              진로
            </motion.button>
          ) : (
            <motion.button
              id="non-check-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFuture}
            >
              진로
            </motion.button>
          )}
          {isChristmasSelect === true ? (
            <motion.button
              id="check-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleCristmas}
            >
              크리스마스
            </motion.button>
          ) : (
            <motion.button
              id="non-check-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleCristmas}
            >
              크리스마스
            </motion.button>
          )}
        </div>
        <div id="description">
          <h3>키워드를 하나 선택해서 산타에게</h3>
          <h3>고민을 적어 보내면</h3>
          <h3>산타가 응원 메세지를 보내줄거에요!</h3>
        </div>

        <div>
          <form id="lett-form" onSubmit={handleSubmit}>
            <div id="message-container">
              <MessageInput
                name="message"
                id="message-input"
                placeholder="산타가 잘 읽을 수 있도록 10자 이상 입력해주세요!"
                onChange={handleChangeMessage}
                onKeyUp={changeButton}
                ref={inputValue}
              ></MessageInput>
            </div>

            <Button
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="send-button"
              disabled={button}
            >
              보내기
            </Button>
          </form>
        </div>
      </LetterContainer>
    </Fragment>
  );
};
