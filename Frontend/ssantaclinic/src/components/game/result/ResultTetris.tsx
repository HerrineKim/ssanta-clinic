import React, { useState, useEffect } from 'react';
import { ResultDiv, CoinImg } from './resultstyle';

interface ResultProp {
  isSucces: boolean;
  time: number | null;
  round: number | null;
  onClose: (value: React.SetStateAction<boolean>) => void;
}

export default function ResultTetris(props: ResultProp) {
  const { isSucces, onClose, round } = props;
  const [money, setMoney] = useState<number>(0);

  useEffect(() => {
    if (round !== null && isSucces) {
      if (round >= 40) {
        setMoney(10);
      } else if (round >= 30) {
        setMoney(8);
      } else if (round >= 20) {
        setMoney(6);
      } else if (round >= 10) {
        setMoney(4);
      }
    }
  }, []);

  return (
    <ResultDiv>
      {isSucces ? (
        <div>
          tetris
          <p>감사합니다 {round}까지 해결해 주셨어요!</p>
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
