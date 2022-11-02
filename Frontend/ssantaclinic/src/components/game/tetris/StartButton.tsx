import React from 'react';

const StartButton = ({ callback }: any) => (
  <div>
    <button onClick={callback}>Start Game</button>
  </div>
);

export default StartButton;
