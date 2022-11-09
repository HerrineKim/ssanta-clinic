import React, { useEffect } from 'react';
import { WriteLetter } from '../../components/letter/WriteLetter';
import { Wrapper, CanvasContainer, LetterContainer } from './styles';
import { LetterWrite } from '../../three/LetterWrite';
export const WriteLetterPage = () => {
  useEffect(() => {
    const letterCanvas = new LetterWrite();
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
        <WriteLetter />
      </LetterContainer>
      <CanvasContainer id="letter-canvas"></CanvasContainer>
    </Wrapper>
  );
};
