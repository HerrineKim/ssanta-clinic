import React, { useState, useCallback, useEffect } from 'react';

import './game.css';

import Result from '../result/Result';

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
  const { onClose, wit } = props;
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [roundFlag, setRoundFlag] = useState(false);
  const [current, setCurrent] = useState(1);
  const [isFail, setIsFail] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [gameClear, setGameClear] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(4);
  const [money, setMoney] = useState<number>(0);

  const [time, setTime] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(3);

  const handleClick = (num: number, e: any) => {
    if (roundFlag) {
      if (num === current) {
        e.target.style.borderColor = '#12de48';
        setTimeout(() => {
          e.target.style.borderColor = '#f5f5f5';
        }, 300);
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
          e.target.style.borderColor = '#bf1f1f';
          setTimeout(() => {
            e.target.style.borderColor = '#f5f5f5';
          }, 300);
        }
      }
    }
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
      setRoundFlag(true);
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
    //npc 대화 처리
    console.log('gameover!!!!');
    setGameFlag(false);
    setIsFail(true);
    setRoundFlag(false);
  }, []);

  const result = () => {
    if (time <= 30) {
      setMoney(3000);
    } else if (time <= 40) {
      setMoney(2000);
    } else if (time <= 50) {
      setMoney(1500);
    } else if (time <= 60) {
      setMoney(1000);
    } else {
      setMoney(500);
    }
    setIsResult(true);
  };

  // console.log(typeof handleClick);
  return (
    <div className="game-container">
      <button
        className="outbtn"
        onClick={() => {
          onClose(false);
        }}
      >
        X
      </button>
      <div className="wit-content">
        {isResult ? (
          <Result
            isSucces={gameClear}
            money={money}
            time={time}
            round={null}
            onClose={onClose}
            wit={wit}
          ></Result>
        ) : null}

        <div
          className="wit-header"
          style={{
            fontSize: '20px',
            fontFamily: 'Cafe24Ssurround',
            textShadow: '0 0 10px black',
          }}
        >
          <div className="round-counter">{time}</div>
          <div className="click-count">기회: {clickCount}</div>
        </div>
        {(!gameFlag || isFail || gameClear) && (
          <div className="memory-start">
            {(isFail || gameClear) && (
              <div className="memory-'result'">
                {isFail ? (
                  <div className="wit-over">Game Over!</div>
                ) : (
                  gameClear && <div className="wit-clear">Congratulation!</div>
                )}
              </div>
            )}
            <div
              className="memory-'start__text"
              style={{
                fontSize: gameClear || isFail ? '5vmin' : '20vmin',
                color: 'green',
                cursor: 'pointer',
                fontFamily: 'Cafe24Ssurround',
                textShadow: '0 0 10px black',
              }}
              onClick={() => {
                if (isFail || gameClear) {
                  result();
                } else {
                  startGame();
                }
              }}
            >
              {isFail || gameClear ? '결과 확인' : 'Start'}
            </div>
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
              onClick={(event) => handleClick(num, event)}
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
