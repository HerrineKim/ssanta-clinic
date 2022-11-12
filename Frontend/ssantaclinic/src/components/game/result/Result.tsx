import React, { useState, useCallback, useEffect } from 'react';
import { ResultDiv, CoinImg } from './resultstyle';

interface ResultProp {
  isSucces: boolean;
  time: number | null;
  round: number | null;
  onClose: (value: React.SetStateAction<boolean>) => void;
  game: number;
}

export default function Result(props: ResultProp) {
  const { isSucces, onClose, time, game } = props;
  const [money, setMoney] = useState<number>(0);
  console.log(game);
  useEffect(() => {
    if (time !== null && isSucces) {
      if (time <= 30) {
        setMoney(10);
      } else if (time <= 40) {
        setMoney(8);
      } else if (time <= 50) {
        setMoney(6);
      } else if (time <= 60) {
        setMoney(4);
      } else {
        setMoney(2);
      }
    }
  }, []);
  console.log(time);
  return (
    <ResultDiv>
      {isSucces ? (
        <div>
          memory
          <p>감사합니다 {time}만에 해결해 주셨어요!</p>
          <p>알바비드릴게요!</p>
          {money}
          <CoinImg src="img/coin.png"></CoinImg>
        </div>
      ) : (
        '실망스럽습니다'
      )}
      <button onClick={() => onClose(false)}>돌아가기</button>
    </ResultDiv>
  );
}
