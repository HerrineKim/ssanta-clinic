import React, { useState, useEffect } from 'react';
import { ResultDiv, CoinImg, YesButton } from './resultstyle';
import axios from 'axios';
import { API_BASE_URL } from '../../../apis/url';
import { useSetRecoilState } from 'recoil';
import { Money } from '../../../store/store';

interface ResultProp {
  isSucces: boolean;
  time: number | null;
  round: number | null;
  money: number;
  onClose: (value: React.SetStateAction<boolean>) => void;
  tetris: (value: React.SetStateAction<boolean>) => void;
}

export default function ResultTetris(props: ResultProp) {
  const { isSucces, onClose, round, money, tetris } = props;
  const BASE_URL = API_BASE_URL;
  const ACCESS_TOKEN = `${localStorage.getItem('jwt')}`;
  const setUserMoney = useSetRecoilState(Money);

  useEffect(() => {
    axios({
      method: 'patch',
      url: `${BASE_URL}coin`,
      data: { coin: money },
      headers: { Authorization: ACCESS_TOKEN },
    }).then((res) => {
      console.log(res);
      setUserMoney(res.data.coin);
    });
  }, []);

  return (
    <ResultDiv>
      {isSucces ? (
        <div>
          <p>감사합니다 {round}라운드까지 해결해 주셨어요!</p>
          <p>알바비드릴게요!</p>
          {money}
          <CoinImg src="img/coin.png"></CoinImg>
        </div>
      ) : (
        '실망스럽습니다'
      )}
      <YesButton
        onClick={() => {
          onClose(false);
          tetris(false);
        }}
      >
        돌아가기
      </YesButton>
    </ResultDiv>
  );
}
