import styled from 'styled-components';

export const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Div = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const ModalDiv = styled.div`
  position: absolute;
  top: 100px;
  left: 200px;
  width: 50%;
  height: 60%;
  display: none;
  background-color: green;
  z-index: 4;
`;

export const FriendButton = styled.button`
  z-index: 4;
  position: absolute;
  bottom: 4vh;
  right: 2vw;
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-family: 'Cafe24Ssurround';
  }

  :hover {
  background-color: #fff;
  }

  :active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
  }

  @media (min-width: 768px) {
  {
    min-width: 40px;
    padding: 0 20px;
  }
`;
