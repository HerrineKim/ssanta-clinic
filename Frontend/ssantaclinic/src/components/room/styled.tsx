import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 5;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CanvasContainer = styled.div`
  position: relative;
  border: 5px solid red;

  height: 80%;
  width: 60%;
  background: #8a2be2;
`;
