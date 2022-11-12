import React, { useState, useCallback } from 'react';

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
  const [clickedCards, setClickedCards] = useState<Array<string>>([]);

  const handleClick = (num: number) => {
    if (num === current) {
      if (num === 50) {
        console.log('Success');
        //게임 끝 구현
      }
      const index = numbers.indexOf(num);
      setNumbers((numbers) => [
        ...numbers.slice(0, index),
        num < 26 ? num + 25 : 0,
        ...numbers.slice(index + 1),
      ]);
      setCurrent((current) => current + 1);
    }
    if (num === current && gameFlag) {
      if (num === 50) {
        endGame();
      }
    }
  };

  const startGame = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
    setCountdown(4);
  };
  const endGame = () => {
    setGameFlag(false);
  };

  //게임 클리어
  const clear = useCallback(() => {
    // 클리어시 돈 받기 axios + 클리어 alert
    setGameClear(true);
    setGameFlag(false);
  }, []);

  const gameover = useCallback(() => {
    console.log('gameover!!!!');
    // 게임 오버시 round 만큼 돈 axios + 게임 오버 alert
    setGameFlag(false);
    setIsFail(true);
  }, [clickedCards]);

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
