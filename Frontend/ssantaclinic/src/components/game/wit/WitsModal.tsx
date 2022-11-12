import React, { useState, useCallback, useEffect } from 'react';

import Timer from './Timer';
import './game.css';

const array: number[] = [];
for (let i = 1; i <= 25; i++) {
  array.push(i);
}
const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function WitsModal(props: any) {
  const { onClose } = props;
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [current, setCurrent] = useState(1);
  const [isFail, setIsFail] = useState<boolean>(false);
  const [gameClear, setGameClear] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(4);

  const [time, setTime] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(3);

  const handleClick = (num: number) => {
    if (num === current) {
      if (num === 50) {
        console.log('Success');
        clear();
        //게임 끝 구현
      }
      const index = numbers.indexOf(num);
      setNumbers((numbers) => [
        ...numbers.slice(0, index),
        num < 26 ? num + 25 : 0,
        ...numbers.slice(index + 1),
      ]);
      setCurrent((current) => current + 1);
    } else {
      if (clickCount === 1) {
        gameover();
      } else {
        setClickCount((prev) => prev - 1);
      }
    }
  };

  const endGame = () => {
    setGameFlag(false);
  };

  const startGame = () => {
    setGameFlag(true);
    setTime(0);

    const countdown = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      setCountdown(0);
      clearTimeout(countdown);
      setNumbers(shuffleArray(array));
      setCurrent(1);
      setGameFlag(true);
    }, 4000);
  };

  useEffect(() => {
    let limitTimeCounter: NodeJS.Timer;
    if (gameFlag) {
      setTimeout(() => {
        limitTimeCounter = setInterval(() => {
          setTime((prev) => prev + 1);
        }, 1000);
      }, 4000);
    }
    return () => clearInterval(limitTimeCounter);
  }, [gameFlag]);

  //게임 클리어
  const clear = useCallback(() => {
    // 클리어시 돈 받기 axios + 클리어 alert
    setGameClear(true);
    setGameFlag(false);
  }, []);

  const gameover = useCallback(() => {
    console.log('gameover!!!!');
    setGameFlag(false);
    setIsFail(true);
  }, []);

  // console.log(typeof handleClick);
  return (
    <div className="game-container">
      <button
        className="outbtn"
        onClick={() => {
          onClose(false);
        }}
      >
        나가기
      </button>
      <div className="wit-content">
        <div className="wit-header">
          <div className="round-counter">{time}</div>
          <div className="click-count">기회: {clickCount}</div>
        </div>
        {(!gameFlag || isFail || gameClear) && (
          <div className="memory-start">
            {(isFail || gameClear) && (
              <div className="memory-'result'">
                {gameClear && (
                  <div className="memory-'clear'">Congratulation!</div>
                )}
              </div>
            )}
            <span
              className="memory-'start__text"
              style={{ fontSize: gameClear || isFail ? '5vmin' : '20vmin' }}
              onClick={() => {
                startGame();
                console.log('click');
              }}
            >
              {isFail || gameClear ? 'Restart' : 'Start'}
            </span>
          </div>
        )}
        <div className="memory-status">
          {isFail
            ? ''
            : gameFlag &&
              (countdown === 0 ? 'Click!' : countdown !== 4 && countdown)}
        </div>
        <div className="board-container">
          {numbers.map((num: number, index: number) => (
            <div
              key={index}
              className="cell-container"
              onClick={() => handleClick(num)}
            >
              {num !== 0 ? num : null}
            </div>
          ))}
        </div>
      </div>
      {/* {gameFlag ? <Timer></Timer> : <button onClick={startGame}>start</button>} */}
    </div>
  );
}
