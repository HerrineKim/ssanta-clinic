/* eslint-disable react/no-unknown-property */
import React, { useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { OtherRoom } from '../../components/otherroom/OtherRoom';
import { Wrapper, CanvasContainer, ToHomeButton, FollowButton } from './styles';
import { OtherRoomThree } from '../../three/OtherRoomThree';
import { OtherCalendarAlert } from '../../components/room/calendaralert/OtherCalendar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const OtherRoomPage = () => {
  const opts: YouTubeProps['opts'] = {
    height: '70',
    width: '70',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
    },
  };

  const items = [1, 2, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0];
  const navigate = useNavigate();
  useEffect(() => {
    const roomCanvas = new OtherRoomThree(items);

    console.log('useeffect');
    const requestId1 = requestAnimationFrame(
      roomCanvas.render.bind(roomCanvas),
    );

    return () => {
      cancelAnimationFrame(requestId1);
    };
  }, []);

  function ToHome() {
    navigate('/');
  }
  return (
    <Wrapper>
      <div
        // 메인화면 유튜브 BGM 제거/수정하고 싶으면 여기서!
        style={{
          position: 'fixed',
          bottom: -3,
          left: 0,
          zIndex: 1000,
        }}
      >
        <YouTube videoId="9QxFoMEkYBA" opts={opts} />
      </div>
      <OtherRoom />
      <OtherCalendarAlert></OtherCalendarAlert>
      <CanvasContainer id="other-room-canvas"></CanvasContainer>
      <FollowButton
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* 팔로우 되어 있지 않으면 '팔로우', 팔로우 되어 있으면 '언팔로우' */}
        <span>팔로우</span>
      </FollowButton>
      <ToHomeButton
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={ToHome}
      >
        🏠
      </ToHomeButton>
    </Wrapper>
  );
};
