import styled from 'styled-components';

export const NotiModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  overflow-y: scroll;
  #noti {
    background: white;
    width: 70%;
    height: 5%;
    margin-top: 3%;
    border: 1px solid black;
    border-radius: 20px;
    font-family: 'Cafe24Ssurround';
    box-shadow: 5px 5px 5px 5px gray;
    .noti-message {
      margin: auto auto;
    }
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
`;

export const NotiModalCloseButton = styled.button`
  position: absolute;
  background-color: #fbeee0;
  width: 5%;
  height: 5%;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0;
  margin-right: 1%;
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
    min-width: 10px;
  }
`;
