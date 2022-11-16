import React, { useEffect } from 'react';
import { LogIn } from '../../components/auth/LogIn';
import { LoginThree } from '../../three/LoginThree';
import { Wrapper, CanvasContainer, LoginContainer } from './styles';
import { LogInToHomePage } from '../logintohome/LogInToHomePage';
import { useRecoilValue } from 'recoil';
import { selectUserIsLogin } from '../../store/store';
export const LogInPage = () => {
  const isLogin = useRecoilValue(selectUserIsLogin);

  useEffect(() => {
    console.log(isLogin, '로그인됐냐');
    const test1Canvas = new LoginThree();
    console.log(test1Canvas.render.bind(test1Canvas));
    console.log('useeffect');
    const requestId1 = requestAnimationFrame(
      test1Canvas.render.bind(test1Canvas),
    );
    // const requestId2 = requestAnimationFrame(
    //   test1Canvas.render2.bind(test1Canvas),
    // );

    return () => {
      cancelAnimationFrame(requestId1);
      // cancelAnimationFrame(requestId2);
    };
  }, []);
  if (isLogin) {
    return (
      <Wrapper>
        <LogInToHomePage checkIsLogin={isLogin}></LogInToHomePage>;
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <LoginContainer>
          <LogIn />
        </LoginContainer>
        <CanvasContainer id="login-canvas"></CanvasContainer>
      </Wrapper>
    );
  }
};
