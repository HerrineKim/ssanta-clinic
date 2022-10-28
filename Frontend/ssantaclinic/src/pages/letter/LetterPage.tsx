import React, { useState } from 'react';
import axios from 'axios';
import './LetterPage.css';

export function Letter() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [button, setButton] = useState(true);
  const [isJobSelect, setIsJobSelect] = useState(false);
  const [isFutureSelect, setIsFutureSelect] = useState(false);

  const handleSubmit = (e: any) => {
    console.log('요청 보냄');
    e.preventDefault();
    axios
      .post('http://localhost:8080' + '/api/letter', {
        title: title,
        message: message,
      })
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
  return (
    <div id="letter-container">
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
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
          <div>
            <h3>편지</h3>
            <textarea
              name="message"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
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
}
