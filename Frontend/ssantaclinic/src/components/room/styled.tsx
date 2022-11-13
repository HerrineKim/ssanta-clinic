import styled from 'styled-components';

export const MyRoomDiv = styled.div`
  border-radius: 20px;
  background-color: whitesmoke;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

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
  height: 80%;
  width: 80%;
  background: #8a2be2;
`;
