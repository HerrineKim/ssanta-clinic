import React, { useEffect } from 'react';
import { LoginToHome } from '../../three/LoginToHome';
import { Wrapper, CanvasContainer } from './styles';
export const LogInToHomePage = () => {
  useEffect(() => {
    const test1Canvas = new LoginToHome();
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
  return (
    <Wrapper>
      <CanvasContainer id="login-to-home-canvas"></CanvasContainer>
    </Wrapper>
  );
};
