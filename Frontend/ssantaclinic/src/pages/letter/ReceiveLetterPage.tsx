import React, { useEffect } from 'react';
import { Wrapper, CanvasContainer, LetterContainer } from './styles';
import { ReceiveLetter } from '../../components/letter/ReceiveLetter';
import { LetterReceiveModel } from '../../three/LetterReceive';
export const ReceiveLetterPage = () => {
  useEffect(() => {
    const letterCanvas = new LetterReceiveModel();
    console.log('useeffect');
    const requestId1 = requestAnimationFrame(
      letterCanvas.render.bind(letterCanvas),
    );

    return () => {
      cancelAnimationFrame(requestId1);
    };
  }, []);
  return (
    <Wrapper>
      <LetterContainer>
        <ReceiveLetter />
      </LetterContainer>
      <CanvasContainer id="letter-canvas"></CanvasContainer>
    </Wrapper>
  );
};
