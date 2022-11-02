import styled from 'styled-components';

export const TreeModalDiv = styled.div`
  width: 90%;
  height: 80%;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
