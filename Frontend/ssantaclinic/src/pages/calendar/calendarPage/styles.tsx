import styled from 'styled-components';

export const CalendarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;

export const CalendarPageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
`;

export const CalendarPageSubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

export const AdventCalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  background-color: red;
`;

export const CalendarPageButton = styled.button`
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
