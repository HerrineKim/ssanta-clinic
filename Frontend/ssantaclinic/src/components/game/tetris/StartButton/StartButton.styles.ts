import styled from 'styled-components';

export const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 65px;
  width: 170px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #111;
  font-family: Cafe24Ssurround;
  font-size: 1.1rem;
  outline: none;
  cursor: pointer;
  box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  outline: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

:hover,
:focus {
  background-color: #9E2B2B;
}

:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

:active {
  background-color: #9E2B2B;
  box-shadow: none;
}
`;
