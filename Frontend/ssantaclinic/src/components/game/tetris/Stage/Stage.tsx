import React from 'react';
import Cell from '../Cell/Cell';
import { StyledStage, OverDiv } from './Stage.styles';
import { TETROMINOS } from '../../../../pages/game/tetris/setup';
import ResultMemory from '../../result/ResultMemory';

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

type Props = {
  stage: STAGE;
  // isFail: boolean;
  // isResult: boolean;
  // onClose: (value: React.SetStateAction<boolean>) => void;
  // result: () => void;
};

const Stage: React.FC<Props> = ({
  stage,
  // isFail,
  // isResult,
  // onClose,
  // result,
}) => (
  <StyledStage>
    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

export default Stage;
