import styled from 'styled-components';
import bgImage from '../../../../src/assets/image/bg.png';

export const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: none;
`;

export const StyledTetris = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  margin: 0 auto;
  margin-top: 80px;
  .display {
    display: flex;
    justify-content: space-between;
    width: 380px;
    font-family: 'IMRegular';
  }
`;

export const GlobalStyles = styled.div`
  margin: 0;
  // background: url(${bgImage}) #000;
  // background-size: cover;
  // background-position: center;
  // background-repeat: repeat;
  &::before {
    content: '';
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: repeat;
    position: absolute;

    top: 0px;
    left: 0px;
  }
  z-index: 2;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

export const GameResult = styled.div`
  position: absolute;
  top: 40%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
