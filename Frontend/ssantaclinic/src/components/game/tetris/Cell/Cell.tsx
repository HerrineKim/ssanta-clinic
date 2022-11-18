import React from 'react';
import { StyledCell } from './Cell.styles';
import { TETROMINOS } from '../../tetris/setup';

type Props = {
  type: keyof typeof TETROMINOS;
};

const Cell: React.FC<Props> = ({ type }) => (
  <StyledCell
    type={type}
    color={TETROMINOS[type].color}
    backgroundImage={`url(/game/house/house1.png)`}
  />
);

export default React.memo(Cell);
