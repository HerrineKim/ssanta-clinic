/* eslint-disable react/no-unknown-property */
import React, { useEffect } from 'react';
import { OtherRoom } from '../../components/otherroom/OtherRoom';
import { Wrapper, CanvasContainer, ToHomeButton } from './styles';
import { OtherRoomThree } from '../../three/OtherRoomThree';
import { CalendarAlert } from '../../components/room/calendaralert/Calendar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const OtherRoomPage = () => {
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
      <OtherRoom />
      <CalendarAlert></CalendarAlert>
      <CanvasContainer id="other-room-canvas"></CanvasContainer>
      <ToHomeButton
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={ToHome}
      >
        마을로 가기
      </ToHomeButton>
    </Wrapper>
  );
};
