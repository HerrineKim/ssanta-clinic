import React, { useEffect } from 'react';
import { LogIn } from '../../components/auth/LogIn';
import { LoginThree } from '../../three/LoginThree';
import { Wrapper, CanvasContainer, LoginContainer } from './styles';

export const LogInInput = () => {
  useEffect(() => {
    const test1Canvas = new LoginThree();
    const requestId1 = requestAnimationFrame(
      test1Canvas.render.bind(test1Canvas),
    );

    return () => {
      cancelAnimationFrame(requestId1);
      test1Canvas.cancle();
    };
  }, []);
  return (
    <Wrapper>
      <LoginContainer>
        <LogIn />
      </LoginContainer>
      <CanvasContainer id="login-canvas"></CanvasContainer>
    </Wrapper>
  );
};
