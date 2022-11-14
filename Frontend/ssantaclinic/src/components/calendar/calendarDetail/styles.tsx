import styled from 'styled-components';

export const CalendarDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  z-index: 998;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.7s;
  background-color: gray;
  border: 1px solid black;
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
padding: 0 18px;
line-height: 50px;
text-align: center;
text-decoration: none;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
z-index: 999;
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
  min-width: 120px;
  padding: 0 25px;
}
`;

export const PresentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: space-around;
  width: 100%;
  height: 100%;
  z-index: 998;
`;
