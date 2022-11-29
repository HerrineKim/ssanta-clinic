import styled from 'styled-components';

export const BoxDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.7s;
  background-color: #f6ebd4;
  border: 2px solid black;
  border-radius: 8px;
  padding: 4%;
`;

export const BoxDetailTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 20%;
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
width: 8px;
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

export const BoxDetailMiddle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: space-around;
  margin-top: 5%;
  width: 100%;
  height: 70%;
`;

export const ContentText = styled.div`
  font-size: 1.5rem;
  font-family: 'IMBold';
  color: black;
  border-radius: 8px;
  margin: 0 0 10px 0;
  word-break: keep-all;
  margin-top: 5%;
`;

export const BoxDetailBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-between;
  align-items: center;
  width: 100%;
  height: 10%;
`;

export const PlayButton = styled.button`
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
margin-bottom: 6%;
margin-left: 2%;
width: 8px;
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

export const ImageButton = styled.button`
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
margin-bottom: 6%;
width: 8px;
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

export const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 15%;
`;

export const SenderText = styled.div`
  font-size: 1.5rem;
  font-family: 'Cafe24Ssurround';
  color: #422800;
`;

export const AudioPlayer = styled.audio`
  width: 50%;
  height: 140%;
  margin-left: 2%;
  margin-bottom: 5%;
  border-radius: 25px;
  border: 2px solid #422800;
  ::-webkit-media-controls-panel {
    background-color: #fbeee0;
  }
  ::-webkit-media-controls-mute-button {
    background-color: #fbefd9;
    border-radius: 50%;
  }
`;
