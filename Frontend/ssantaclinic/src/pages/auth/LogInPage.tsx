import React, { useEffect } from 'react';
import { LogIn } from '../../components/auth/LogIn';
import { LoginThree } from '../../three/LoginThree';
import { Wrapper, CanvasContainer, LoginContainer } from './styles';
import { LogInToHomePage } from '../logintohome/LogInToHomePage';
import { useRecoilValue } from 'recoil';
import { selectUserIsLogin } from '../../store/store';
import YouTube, { YouTubeProps } from 'react-youtube';

export const LogInPage = () => {
  // bgm
  const opts: YouTubeProps['opts'] = {
    height: '70',
    width: '70',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      // 유튜브 주소
      disablekb: 1,
      // controls: 0,
      fs: 0,
      modestbranding: 1,
    },
  };
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
        <div
          // 메인화면 유튜브 BGM 제거/수정하고 싶으면 여기서!
          style={{
            position: 'fixed',
            bottom: -3,
            left: 0,
            zIndex: -1,
          }}
        >
          <YouTube videoId="JJT85ezuLeQ" opts={opts} />
        </div>
        <LoginContainer>
          <LogIn />
        </LoginContainer>
        <CanvasContainer id="login-canvas"></CanvasContainer>
      </Wrapper>
    );
  }
};
