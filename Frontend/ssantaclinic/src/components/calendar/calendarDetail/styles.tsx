import styled from 'styled-components';

export const CalendarDetailContainer = styled.div`
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
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
`;
