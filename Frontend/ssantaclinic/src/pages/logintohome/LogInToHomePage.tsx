import React, { useEffect, useState } from 'react';
import { LoginToHome } from '../../three/LoginToHome';
import { Wrapper, CanvasContainer } from './styles';
import { useNavigate } from 'react-router-dom';

export const LogInToHomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 8000);
    const toHomeCanvas = new LoginToHome();
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
      <CanvasContainer id="login-to-home-canvas"></CanvasContainer>
    </Wrapper>
  );
};
