import { StyledCell } from '../tetris/styles/StyledCell';
import { TETRIMINOS } from './Tetriminos';

const Cell = ({ type }: any) => (
  <StyledCell type={'L'} color={TETRIMINOS['L'].color}>
    cell
  </StyledCell>
);

export default Cell;
