import React from 'react';
import { StyledCell } from '../tetris/styles/StyledCell';
import { TETROMINOS } from './Tetrominos';

const Cell = ({ type }: any) => (
  <StyledCell color={TETROMINOS['L'].color}>Cell</StyledCell>
);

export default Cell;
