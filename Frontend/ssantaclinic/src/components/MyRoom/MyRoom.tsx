import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { selectUserId, selectUserNickname } from '../../store/store';
import { useRecoilValue } from 'recoil';
import { MyRoomContainer } from './styled';

export const MyRoom = () => {
  // const TOKEN = useRecoilValue(selectToken);
  const NICKNAME = useRecoilValue(selectUserNickname);
  const ID = useRecoilValue(selectUserId);
  const TOKEN = localStorage.getItem('jwt') || '';

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/room/' + ID, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  });
  return (
    <MyRoomContainer>
      <h1>마이 룸</h1>
      <h2>
        안녕하세요 {ID}번 째 유저인 {NICKNAME}님
      </h2>
      <h3>당신의 토큰은 {TOKEN}이네요 야미~</h3>
      <div></div>
    </MyRoomContainer>
  );
};
