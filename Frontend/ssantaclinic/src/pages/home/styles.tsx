import styled from 'styled-components';

export const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export const Div = styled.div`
  width: 100%;
  height: 100%;
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
  position: fixed;
  bottom: 200px;
  right: 200px;
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  // display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
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
    min-width: 120px;
    padding: 0 25px;
  }
`;
