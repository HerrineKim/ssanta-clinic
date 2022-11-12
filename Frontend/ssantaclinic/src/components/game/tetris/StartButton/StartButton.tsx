import React from 'react';
import { StyledStartButton } from './StartButton.styles';

type Props = {
  callback: () => void;
};

const StartButton: React.FC<Props> = ({ callback }) => (
  <StyledStartButton onClick={callback}>게임 시작하기</StyledStartButton>
);

export default StartButton;
