import React, { useEffect, useState } from 'react';
import { LoginToHome } from '../../three/LoginToHome';
import { Wrapper, CanvasContainer } from './styles';
import { useNavigate } from 'react-router-dom';

export const LogInToHomePage = (props: any) => {
  const { checkIsLogin, goHome } = props;
  console.log(checkIsLogin, '렌더링 체크');
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
      goHome(true);
    }, 9000);
    const toHomeCanvas = new LoginToHome();
    const requestId2 = requestAnimationFrame(
      toHomeCanvas.render.bind(toHomeCanvas),
    );

    return () => {
      cancelAnimationFrame(requestId2);
    };
  }, []);
  return (
    <Wrapper>
      <CanvasContainer id="login-to-home-canvas"></CanvasContainer>
    </Wrapper>
  );
};
