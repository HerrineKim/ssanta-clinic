import styled from 'styled-components';

export const BoxCreateContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #9e2b2b;
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 2%;
  z-index: 999;
  font-family: 'Cafe24Ssurround';
  font-size: 1.5rem;
  color: white;
`;

export const BoxCreateTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
`;

export const BoxCreateMiddle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80%;
`;

export const BoxCreateBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 10%;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
`;

export const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
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
width: 20%;
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

export const XButton = styled.button`
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
