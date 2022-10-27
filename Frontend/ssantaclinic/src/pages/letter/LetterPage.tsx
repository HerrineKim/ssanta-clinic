import React, { useState } from 'react';
import axios from 'axios';
import './LetterPage.css';

export function Letter() {
  const [letter, setLetter] = useState('');
  const [button, setButton] = useState(true);
  const handleSubmit = (e: any) => {
    setLetter(e.target.value);
  };

  function changeLetter() {
    letter.length >= 10 ? setButton(false) : setButton(true);
  }
  return (
    <div id="letter-container">
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            name="letter"
            id="letter"
            onChange={(e) => setLetter(e.target.value)}
          ></textarea>
          <button type="submit" className="letterButton" disabled={button}>
            산타한테 보내기
          </button>
        </form>
      </div>
    </div>
  );
}
