import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 5;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CanvasContainer = styled.div`
  position: relative;
  border: 5px solid #35904f;
  background: #35904f;
  height: 80%;
  width: 60%;
  border-radius: 10px;
  box-shadow: 10px rgba(0, 0, 0, 0.2);
  z-index: 4;
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

@media (min-width: 100px) {
{
  min-width: 60px;
  padding: 0 25px;
}
`;
