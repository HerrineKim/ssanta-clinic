import React, { useEffect } from 'react';
import { Wrapper, CanvasContainer, LetterPageContainer } from './styles';
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
      <LetterPageContainer>
        <ReceiveLetter />
      </LetterPageContainer>
      <CanvasContainer id="letter-canvas"></CanvasContainer>
    </Wrapper>
  );
};
