import styled from 'styled-components';

export const FriendModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60vw;
  height: 70vh;

  z-index: 999;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: gray;
  border: 1px solid black;
  border-radius: 9px;
`;

export const FriendModalInnerBox = styled.div`
  width: 57vw;
  height: 67vh;
  margin: 2px;
  border-radius: 7px;
  background-color: white;
`;
