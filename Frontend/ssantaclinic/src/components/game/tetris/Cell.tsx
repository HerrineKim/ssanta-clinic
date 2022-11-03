import React from 'react';
import { StyledCell } from '../tetris/styles/StyledCell';
import { TETROMINOS } from './Tetrominos';

const Cell = ({ type }: any) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
);

export default Cell;
