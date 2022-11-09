/* eslint-disable react/no-unknown-property */
import React, { useEffect } from 'react';
import { OtherRoom } from '../../components/otherroom/OtherRoom';
import { Wrapper, CanvasContainer } from './styles';
import { RoomThree } from '../../three/RoomThree';

export const OtherRoomPage = () => {
  useEffect(() => {
    const roomCanvas = new RoomThree();

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
      <OtherRoom />
      <CanvasContainer id="room-canvas"></CanvasContainer>
    </Wrapper>
  );
};
