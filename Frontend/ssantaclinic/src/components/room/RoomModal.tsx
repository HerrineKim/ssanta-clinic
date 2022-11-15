import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Wrapper, CanvasContainer, CloseButton } from './styled';
import { RoomThree } from '../../three/RoomThree';
import axios from 'axios';
import { selectUserId, selectUserNickname } from '../../store/store';
import { useRecoilValue } from 'recoil';
import { CalendarAlert } from './calendaralert/Calendar';
import Loading from '../loading/Loading';
import { MyItems } from '../../store/store';

export default function RoomModal(props: any) {
  const { onClose } = props;
  const items = useRecoilValue(MyItems);
  const NICKNAME = useRecoilValue(selectUserNickname);
  const ID = useRecoilValue(selectUserId);
  const TOKEN = localStorage.getItem('jwt') || '';

  // 트리 정보받기, 캘린더(선물) 정보 받기
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
  }, []);
  console.log(items);
  useEffect(() => {
    const roomCanvas = new RoomThree(items);

    console.log('useeffect');
    const requestId1 = requestAnimationFrame(
      roomCanvas.render.bind(roomCanvas),
    );

    return () => {
      cancelAnimationFrame(requestId1);
    };
  }, []);
  return (
    <Wrapper className="roommodal">
      <CloseButton
        className="outbtn"
        onClick={() => {
          onClose(false);
        }}
      >
        x
      </CloseButton>

      <CalendarAlert></CalendarAlert>
      <CanvasContainer id="room-canvas">
        <Loading></Loading>
      </CanvasContainer>
    </Wrapper>
  );
}
