import React, { useCallback, useState } from 'react';
import axios from 'axios';

type Keyword = '취업' | '진로';

export const WriteLetter = () => {
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [button, setButton] = useState<boolean>(true);
  const [isJobSelect, setIsJobSelect] = useState<boolean>(false);
  const [isFutureSelect, setIsFutureSelect] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<Keyword>('취업');

  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkbGFkaGtzeG9yOTZAbmF2ZXIuY29tIiwiYXV0aCI6IiIsImV4cCI6MTY2NzIwMTQ3MH0.Od2caTwqJo5ZkNnSQJb47nnm1BhIlzUG4pOQWuL-OkGc3kAn6IDk3flLPTQY1tHRV4LBkKNH5sfKPIf6pnKfPA';
  const handleSubmit = (e: any) => {
    console.log('요청 보냄');
    e.preventDefault();
    axios
      .post(
        'http://localhost:8080' + '/api/letter',
        {
          title: title,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        },
      )
      .then((res) => {
        console.log('응답 받아옴 성공!', res.data);
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  };
  const toggleJob = () => {
    setIsJobSelect((isJobSelect) => !isJobSelect); // on,off 개념 boolean
  };
  const toggleFuture = () => {
    setIsFutureSelect((isFutureSelect) => !isFutureSelect); // on,off 개념 boolean
  };
  function changeButton() {
    message.length >= 10 ? setButton(false) : setButton(true);
  }
  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div id="write-letter-container">
      <div>
        <h1>어떤 고민이 있니</h1>
      </div>
      <div>
        <h2>고민 고르기</h2>
        <div>
          <button onClick={toggleJob}>
            {isJobSelect ? '취업' : '취업 선택됨'}
          </button>
          <button onClick={toggleFuture}>
            {isFutureSelect ? '진로' : '진로 선택됨'}
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>제목</h3>
            <textarea
              name="title"
              id="title"
              onChange={handleChangeTitle}
              required
            ></textarea>
          </div>
          <div>
            <h3>편지</h3>
            <textarea
              name="message"
              id="message"
              onChange={handleChangeMessage}
              onKeyUp={changeButton}
            ></textarea>
          </div>

          <button type="submit" className="letterButton" disabled={button}>
            산타한테 보내기
          </button>
        </form>
      </div>
    </div>
  );
};
