import React, { useEffect, useState } from 'react';
import { Wrapper, CanvasContainer, CloseButton, DisButton } from './styled';
import { RoomThree } from '../../three/RoomThree';
import axios from 'axios';
import { selectUserId } from '../../store/store';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CalendarAlert } from './calendaralert/Calendar';
import Loading from '../loading/Loading';
import { MyItems } from '../../store/store';
import { API_BASE_URL } from '../../apis/url';
import Saving from './saving/Saving';
import Descript from './descript/Descripte';
import Descript2 from './descript/Descripte2';

export default function RoomModal(props: any) {
  const { onClose } = props;
  const BASE_URL = API_BASE_URL;
  const items = useRecoilValue(MyItems);
  const setItems = useSetRecoilState(MyItems);
  let roomCanvas: any;

  const ID = useRecoilValue(selectUserId);
  const TOKEN = localStorage.getItem('jwt') || '';

  const [isSave, setIsSave] = useState<boolean>(false);
  const [isSuccess, SetIsSuccess] = useState<boolean>(false);

  const [isDis, setIsDis] = useState<boolean>(true);
  const [scenenumber, setSceneNumber] = useState<number>(0);

  // 트리 정보받기, 캘린더(선물) 정보 받기

  // useEffect(() => {
  //   console.log(isSave, isSuccess);
  // }, [isSave, isSuccess]);

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

        roomCanvas.setupOnce();
        console.log('useeffect');
        requestId1 = requestAnimationFrame(render);
      })
      .catch((err) => {
        console.log(err.resonse);
        roomCanvas = new RoomThree(items, '');

        roomCanvas.setupOnce();
        console.log('useeffect');
        requestId1 = requestAnimationFrame(render);
      });
    return () => {
      cancelAnimationFrame(requestId1);
      cancelAnimationFrame(id);
      setItems(roomCanvas._remainItems);
    };
  }, []);

  let id: any;
  const render = () => {
    setIsSave(roomCanvas._isSave);
    SetIsSuccess(roomCanvas._saveSuccess);
    setSceneNumber(roomCanvas._scenenumber);
    if (roomCanvas._scenenumber === 1) {
      // console.log(this._camera.position);
      roomCanvas._renderer.render(roomCanvas._scene, roomCanvas._camera);
      roomCanvas.update();
      // console.log('!');

      id = requestAnimationFrame(render);
    } else {
      // inven scene
      roomCanvas._renderer.render(roomCanvas._scene2, roomCanvas._camera);
      roomCanvas.update2();

      id = requestAnimationFrame(render);
    }
  };

  return (
    <Wrapper className="roommodal" id="room">
      <CloseButton
        className="outbtn"
        onClick={() => {
          onClose(false);
        }}
      >
        x
      </CloseButton>
      <DisButton
        className="outbtn"
        onClick={() => {
          setIsDis(!isDis);
        }}
      >
        설명
      </DisButton>

      <CalendarAlert></CalendarAlert>
      <CanvasContainer id="room-canvas">
        <Loading></Loading>
        {(isSave || isSuccess) && (
          <Saving result={[isSave, isSuccess]}></Saving>
        )}
        {isDis &&
          (scenenumber === 1 ? <Descript></Descript> : <Descript2></Descript2>)}
      </CanvasContainer>
    </Wrapper>
  );
}
