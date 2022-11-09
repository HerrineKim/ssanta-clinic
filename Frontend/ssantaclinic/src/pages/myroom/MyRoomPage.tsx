/* eslint-disable react/no-unknown-property */
import React, { useEffect } from 'react';
import { MyRoom } from '../../components/MyRoom/MyRoom';
import { Wrapper, CanvasContainer } from './styles';
import { RoomThree } from '../../three/RoomThree';

export const MyRoomPage = () => {
  const items = [1, 2, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0];
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
    <Wrapper>
      <MyRoom />
      <CanvasContainer id="room-canvas"></CanvasContainer>
    </Wrapper>
  );
};
