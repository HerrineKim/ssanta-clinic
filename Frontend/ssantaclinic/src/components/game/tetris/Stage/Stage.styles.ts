import styled from 'styled-components';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../../tetris/setup';

export const StyledStage = styled.div`
  display: grid;
  grid-template-columns: repeat(${STAGE_WIDTH}, 30px);
  grid-template-rows: repeat(${STAGE_HEIGHT}, 30px);
  grid-gap: 1px;
  border: 1px solid #777;
  background: #222;
`;

// export const OverDiv = styled.div`
//   position: relative;
//   top: 50%;
//   left: 50%;
// `;
