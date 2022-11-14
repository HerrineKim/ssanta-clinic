import React, { useState, useEffect } from 'react';
import { ResultDiv, CoinImg } from './resultstyle';
import { SSantaApi } from '../../../apis/ssantaApi';
import { useNavigate } from 'react-router-dom';
import { Money } from '../../../store/store';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
interface ResultProp {
  isSucces: boolean;
  time: number | null;
  round: number | null;
  onClose: (value: React.SetStateAction<boolean>) => void;
}

export default function ResultMemory(props: ResultProp) {
  const navigate = useNavigate();
  const { isSucces, onClose, round } = props;
  const [money, setMoney] = useState<number>(0);
  const setUserMoney = useSetRecoilState(Money);
  // const totalmoney = useRecoilValue(Money);
  const ACCESS_TOKEN = `${localStorage.getItem('jwt')}`;

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

  axios({
    method: 'patch',
    url: 'http://localhost:8080/api/coin',
    data: { coin: money },
    headers: { Authorization: ACCESS_TOKEN },
  }).then((res) => console.log(res));

  return (
    <ResultDiv>
      {isSucces ? (
        <div>
          memory
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
