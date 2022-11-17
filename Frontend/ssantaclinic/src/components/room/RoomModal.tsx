import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Wrapper, CanvasContainer, CloseButton } from './styled';
import { RoomThree } from '../../three/RoomThree';
import axios from 'axios';
import { selectUserId, selectUserNickname } from '../../store/store';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CalendarAlert } from './calendaralert/Calendar';
import Loading from '../loading/Loading';
import { MyItems } from '../../store/store';
import { API_BASE_URL } from '../../apis/url';
import Saving from './saving/Saving';

export default function RoomModal(props: any) {
  const { onClose } = props;
  const BASE_URL = API_BASE_URL;
  const items = useRecoilValue(MyItems);
  const setItems = useSetRecoilState(MyItems);
  let roomCanvas: any;
  const NICKNAME = useRecoilValue(selectUserNickname);
  const ID = useRecoilValue(selectUserId);
  const TOKEN = localStorage.getItem('jwt') || '';
  const [isTree, setIsTree] = useState<boolean>(true);

  const [isSave, setIsSave] = useState<boolean>(false);

  // 트리 정보받기, 캘린더(선물) 정보 받기

  useEffect(() => {
    console.log(items);
  });

  useEffect(() => {
    let requestId1: number;
    axios
      .get(`${BASE_URL}tree/${ID}`, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
        roomCanvas = new RoomThree(items, res.data.tree);
        setIsTree(true);
        roomCanvas.setupOnce();
        console.log('useeffect');
        requestId1 = requestAnimationFrame(render);
      })
      .catch((err) => {
        console.log(err.resonse);
        roomCanvas = new RoomThree(items, '');
        setIsTree(false);
        roomCanvas.setupOnce();
        console.log('useeffect');
        requestId1 = requestAnimationFrame(render);
      });
    return () => {
      cancelAnimationFrame(requestId1);
      setItems(roomCanvas._remainItems);
    };
  }, []);
  console.log(items);

  const render = (time: number) => {
    setIsSave(roomCanvas._isSave);

    if (roomCanvas._scenenumber === 1) {
      // console.log(this._camera.position);
      roomCanvas._renderer.render(roomCanvas._scene, roomCanvas._camera);
      roomCanvas.update();
      // console.log('!');

      requestAnimationFrame(render);
    } else {
      // inven scene
      roomCanvas._renderer.render(roomCanvas._scene2, roomCanvas._camera);
      roomCanvas.update2();

      requestAnimationFrame(render);
    }
  };

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
        {isSave && <Saving></Saving>}
      </CanvasContainer>
    </Wrapper>
  );
}
