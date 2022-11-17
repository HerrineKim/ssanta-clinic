import React from 'react';
import { Wrapper } from './styles';
import { LogInToHomePage } from '../logintohome/LogInToHomePage';
import { useRecoilValue } from 'recoil';
import { selectUserIsLogin } from '../../store/store';
import YouTube, { YouTubeProps } from 'react-youtube';
import { LogInInput } from './LoginInput';

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
  // const isLogin = true;

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

      {/* {isLogin && <LogInToHomePage tohome={isLogin}></LogInToHomePage>} */}
      {!isLogin && <LogInInput></LogInInput>}
    </Wrapper>
  );
};
