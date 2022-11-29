import styled from 'styled-components';

export const CalendarDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 70%;
  z-index: 998;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.7s;
  background-color: #335749;
  border: 2px solid black;
  border-radius: 8px;
`;

export const CalendarDetailTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30%;
  padding: 5%;
`;

export const CalendarDetailBottomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: space-around;
  width: 100%;
  height: 70%;
  padding: 7% 1%;
  z-index: 999;
`;

export const DayDiv = styled.div`
  font-size: 3rem;
  font-family: 'Cafe24Ssurround';
  color: white;
  border-radius: 8px;
`;

export const CloseButton = styled.button`
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-family: 'Cafe24Ssurround';
  margin-top: 0;
  width: 5%;
  }

  :hover {
  background-color: #fff;
  }

  :active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
  }

  @media (min-width: 100px) {
  {
    min-width: 60px;
  }
`;
