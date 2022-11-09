import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { selectUserId, selectUserNickname } from '../../store/store';
import { useRecoilValue } from 'recoil';
import { MyRoomContainer } from './styled';
import NotificationPage from '../../pages/NotificationPage';
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
      {/* <h1>마이 룸</h1>
      <NotificationPage /> */}
    </MyRoomContainer>
  );
};
