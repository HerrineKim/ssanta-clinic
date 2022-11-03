/* eslint-disable react/no-unknown-property */
import React, { useEffect } from 'react';
import { MyRoom } from '../../components/MyRoom/MyRoom';
import { Wrapper, CanvasContainer } from './styled';
import { Test } from '../../three/basic';
export const MyRoomPage = () => {
  useEffect(() => {
    const homeCanvas = new Test();
    // const canvas = document.querySelector('canvas');
    // console.log(canvas);
    console.log('useeffect');
    const requestId = requestAnimationFrame(homeCanvas.render.bind(homeCanvas));

    return () => cancelAnimationFrame(requestId);
  }, []);
  return (
    <Wrapper>
      <MyRoom />
      <CanvasContainer id="canvas"></CanvasContainer>
    </Wrapper>
  );
};
