import styled from 'styled-components';

export const ResultDiv = styled.div`
  width: 300px;
  height: 200px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CoinImg = styled.img`
  width: 50px;
  height: 50px;
  z-index: 999;
  vertical-align: middle;
`;
