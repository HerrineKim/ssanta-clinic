import styled from 'styled-components';

export const BoxDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 70%;
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.7s;
  background-color: #335749;
  border: 2px solid black;
  border-radius: 8px;
`;
