import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MyRoomDiv, Wrapper, CanvasContainer } from './styled';
import { RoomThree } from '../../three/RoomThree';

export default function RoomModal(props: any) {
  const { onClose } = props;
  const items: number[] = [];
  for (let i = 1; i < 25; i++) {
    items.push(1);
  }
  useEffect(() => {
    const roomCanvas = new RoomThree(items);

    console.log('useeffect');
    const requestId1 = requestAnimationFrame(
      roomCanvas.render.bind(roomCanvas),
    );

    return () => {
      cancelAnimationFrame(requestId1);
    };
  }, []);
  return (
    <Wrapper>
      <button
        className="outbtn"
        onClick={() => {
          onClose(false);
        }}
      >
        나가기
      </button>
      <CanvasContainer id="room-canvas"></CanvasContainer>
    </Wrapper>
  );
}
