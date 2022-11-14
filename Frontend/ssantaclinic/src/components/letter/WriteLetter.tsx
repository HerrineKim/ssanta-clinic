import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { selectUserNickname, selectUserId } from '../../store/store';
import { useRecoilValue } from 'recoil';
import {
  LetterContainer,
  Button,
  TitleInput,
  MessageInput,
  CheckButton,
} from './styles';

type Keyword = '취업' | '진로' | '크리스마스';

export const WriteLetter = () => {
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [button, setButton] = useState<boolean>(true);
  const [isJobSelect, setIsJobSelect] = useState<boolean>(true);
  const [isFutureSelect, setIsFutureSelect] = useState<boolean>(false);
  const [isChristmasSelect, setIsCristmasSelect] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<Keyword>('취업');
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const ID = useRecoilValue(selectUserId);
  const NICNAME = useRecoilValue(selectUserNickname);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    console.log('요청 보냄');
    e.preventDefault();
    axios
      .post(
        'http://localhost:8080' + '/api/letter',
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
        console.log('응답 받아옴 성공!', res.data);
        navigate('/room');
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
      setKeyword('취업');
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
      setKeyword('진로');
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
        setKeyword('크리스마스');
      }
    }
  };
  function changeButton() {
    message.length >= 10 ? setButton(false) : setButton(true);
  }
  // const handleChangeTitle = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setTitle(e.target.value);
  //   },
  //   [],
  // );

  const handleChangeMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    [],
  );

  return (
    <LetterContainer id="write-letter-container">
      <div id="header">
        <h1 id="header-text">어떤 고민이 있나요?</h1>
      </div>
      <div id="set-category">
        <CheckButton onClick={toggleJob}>
          {isJobSelect ? '취업' : 'X'}
        </CheckButton>
        <CheckButton onClick={toggleFuture}>
          {isFutureSelect ? '진로' : 'X'}
        </CheckButton>
        <CheckButton onClick={toggleCristmas}>
          {isChristmasSelect ? '크리스마스' : 'X'}
        </CheckButton>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div id="message-container">
            <MessageInput
              name="message"
              id="message-input"
              onChange={handleChangeMessage}
              onKeyUp={changeButton}
            ></MessageInput>
          </div>

          <Button type="submit" className="send-button" disabled={button}>
            보내기
          </Button>
        </form>
      </div>
    </LetterContainer>
  );
};
