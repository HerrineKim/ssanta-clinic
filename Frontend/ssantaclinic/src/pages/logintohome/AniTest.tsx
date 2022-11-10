import React, { useEffect, useState } from 'react';
import { aniTest } from '../../three/aniTest';
import { Wrapper, CanvasContainer } from './styles';
import { useNavigate } from 'react-router-dom';

export const AniTestPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const toHomeCanvas = new aniTest();
    console.log(toHomeCanvas.render.bind(toHomeCanvas));
    console.log('useeffect');
    const requestId1 = requestAnimationFrame(
      toHomeCanvas.render.bind(toHomeCanvas),
    );

    return () => {
      cancelAnimationFrame(requestId1);
    };
  }, []);
  return (
    <Wrapper>
      <CanvasContainer id="test-canvas"></CanvasContainer>
    </Wrapper>
  );
};
