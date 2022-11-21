import React, { useEffect } from 'react';
import {
  Wrapper,
  CanvasContainer,
  LetterPageContainer,
  Button,
} from './styles';
import { ReceiveLetter } from '../../components/letter/ReceiveLetter';
import { LetterReceiveModel } from '../../three/LetterReceive';
import { motion } from 'framer-motion';

export const ReceiveLetterPage = (props: any) => {
  const { onLetterId, onBack, goList } = props;
  useEffect(() => {
    // console.log(onLetterId);
    const letterCanvas = new LetterReceiveModel();
    // console.log('useeffect');
    const requestId1 = requestAnimationFrame(
      letterCanvas.render.bind(letterCanvas),
    );

    return () => {
      cancelAnimationFrame(requestId1);
      letterCanvas.cancle();
    };
  }, []);
  return (
    <Wrapper>
      <LetterPageContainer id="letter-receive-page-container">
        <ReceiveLetter onLetterId={onLetterId} />
        <Button
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          id="receive-back-button"
          onClick={() => {
            onBack(false);
            goList(true);
          }}
        >
          뒤로가기
        </Button>
      </LetterPageContainer>
      <CanvasContainer id="letter-canvas"></CanvasContainer>
    </Wrapper>
  );
};
