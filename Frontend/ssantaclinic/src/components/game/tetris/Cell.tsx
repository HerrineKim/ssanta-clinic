import { StyledCell } from '../tetris/styles/StyledCell';
import { TETRIMINOS } from './Tetriminos';
import React from 'react';

const Cell = ({ type }: any) => (
  <StyledCell color={TETRIMINOS['L'].color}>cell</StyledCell>
);

export default Cell;
