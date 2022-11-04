import styled from 'styled-components';
import bgImage from '../../../../src/assets/image/bg.png';

export const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100vh;
  // overflow: hidden;
  outline: none;
`;

export const StyledTetris = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  margin: 0 auto;

  .display {
    display: flex;
    justify-content: space-between;
    width: 380px;
  }
`;

export const GlobalStyles = styled.div`
  margin: 0;
  padding: 20px;
  background: url(${bgImage}) #000;
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
`;
