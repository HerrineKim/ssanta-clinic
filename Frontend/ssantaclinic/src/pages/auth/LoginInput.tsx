import React, { useEffect, useState } from 'react';
import { LogIn } from '../../components/auth/LogIn';
import { LoginThree } from '../../three/LoginThree';
import { Wrapper, CanvasContainer, LoginContainer } from './styles';
import { LogInToHomePage } from '../logintohome/LogInToHomePage';
import { useRecoilValue } from 'recoil';
import { selectUserIsLogin } from '../../store/store';
import YouTube, { YouTubeProps } from 'react-youtube';

export const LogInInput = () => {
  useEffect(() => {
    const test1Canvas = new LoginThree();
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
