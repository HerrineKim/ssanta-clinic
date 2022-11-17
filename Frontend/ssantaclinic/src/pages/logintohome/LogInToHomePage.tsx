import React, { useEffect, useState } from 'react';
import { LoginToHome } from '../../three/LoginToHome';
import { Wrapper, CanvasContainer } from './styles';
import { useNavigate } from 'react-router-dom';
import { isLogIn, selectUserIsLogin, isLoggedIn } from '../../store/store';
import { useRecoilValue } from 'recoil';
import { redirect } from 'react-router-dom';
export const LogInToHomePage = (props: any) => {
  const { tohome } = props;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(tohome, '투홈 상태');
    setTimeout(() => {
      navigate('/');
    }, 7000);
    const toHomeCanvas = new LoginToHome();
    const requestId2 = requestAnimationFrame(
      toHomeCanvas.render.bind(toHomeCanvas),
    );
    return () => {
      cancelAnimationFrame(requestId2);
    };
  }, [tohome]);
  // function ToHome() {
  //   // setTimeout(() => {
  //   //   navigate('/');
  //   // }, 7000);
  //   const toHomeCanvas = new LoginToHome();
  //   const requestId2 = requestAnimationFrame(
  //     toHomeCanvas.render.bind(toHomeCanvas),
  //   );

  //   return () => {
  //     cancelAnimationFrame(requestId2);
  //   };
  // }

  return (
    <Wrapper>
      <CanvasContainer id="login-to-home-canvas"></CanvasContainer>
    </Wrapper>
  );
};
