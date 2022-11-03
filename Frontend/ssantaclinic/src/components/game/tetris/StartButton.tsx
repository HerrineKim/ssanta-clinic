import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

const StartButton = ({ callback }: any) => (
  <div>
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
  </div>
);

export default StartButton;
