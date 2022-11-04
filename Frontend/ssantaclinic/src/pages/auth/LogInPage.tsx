import React, { useEffect } from 'react';
import { LogIn } from '../../components/auth/LogIn';
import { LoginThree } from '../../three/LoginThree';
import { Wrapper, CanvasContainer, LoginContainer } from './styles';
export const LogInPage = () => {
  useEffect(() => {
    const test1Canvas = new LoginThree();

    console.log('useeffect');
    const requestId1 = requestAnimationFrame(
      test1Canvas.render.bind(test1Canvas),
    );

    return () => {
      cancelAnimationFrame(requestId1);
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
