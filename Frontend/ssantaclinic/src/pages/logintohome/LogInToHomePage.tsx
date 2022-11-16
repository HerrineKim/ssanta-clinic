import React, { useEffect, useState } from 'react';
import { LoginToHome } from '../../three/LoginToHome';
import { Wrapper, CanvasContainer } from './styles';
import { useNavigate } from 'react-router-dom';

export const LogInToHomePage = (props: any) => {
  const { checkIsLogin } = props;
  console.log(checkIsLogin, '렌더링 체크');
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 9000);
    if (checkIsLogin) {
      const toHomeCanvas = new LoginToHome();
      console.log(toHomeCanvas.render.bind(toHomeCanvas));
      console.log('useeffect');
      const requestId2 = requestAnimationFrame(
        toHomeCanvas.render.bind(toHomeCanvas),
      );

      return () => {
        cancelAnimationFrame(requestId2);
      };
    }
  }, []);
  return (
    <Wrapper>
      <CanvasContainer id="login-to-home-canvas"></CanvasContainer>
    </Wrapper>
  );
};
