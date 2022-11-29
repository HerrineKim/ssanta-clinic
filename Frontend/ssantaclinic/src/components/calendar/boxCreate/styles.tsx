import styled from 'styled-components';

export const BoxCreateContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  min-width: 800px;
  height: 60%;
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
  font-family: IMRegular;
  padding-top: 4%;
`;

export const RecordText = styled.div`
  width: 100%;
  height: 10%;
  font-size: 1.6rem;
  color: white;
  font-family: 'Cafe24Ssurround';
`;

export const RecordPlayer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10%;
  margin-top: 10%;
`;

export const RecordStatus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: 1rem;
  margin-top: 5%;
  margin-left: 5%;
`;

export const RecordButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 30%;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  font-size: 1.2rem;
  font-family: 'Cafe24Ssurround';
  margin-right: 5%;
`;

export const ImageText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: 1.6rem;
  font-family: 'Cafe24Ssurround';
  color: white;
`;

export const ImageUploader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 45%;
  font-size: 2rem;
  font-family: 'Cafe24Ssurround';
  color: white;
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
width: 25%;
min-width: 200px;
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

export const DayText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const DayInput = styled.input`
  width: 10%;
  min-width: 70px;
  height: 100%;
  border: 2px solid #422800;
  border-radius: 10px;
  background-color: #fbeee0;
  font-family: 'Cafe24Ssurround';
  font-size: 1.2rem;
  color: #422800;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

export const DaySenderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 100%;
`;

export const SenderText = styled.div`
  font-size: 1.5rem;
  margin-left: 5%;
`;

export const SenderInput = styled.input`
  width: 30%;
  min-width: 100px;
  height: 100%;
  border: 2px solid #422800;
  border-radius: 10px;
  background-color: #fbeee0;
  font-family: 'Cafe24Ssurround';
  font-size: 1.2rem;
  color: #422800;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  min-width: 200px;
  height: 60%;
  border: 2px solid #422800;
  border-radius: 10px;
  background-color: #fbeee0;
  font-family: 'IMRegular';
  font-size: 1.2rem;
  color: #422800;
  padding: 5%;
  // 스크롤 제거
  &::-webkit-scrollbar {
    display: none;
  }
  resize: none;
  // 150자 제한
  &::placeholder {
    color: black;
    font-family: 'IMRegular';
    font-size: 1.2rem;
  }
`;

export const RecordSaveButton = styled.button`
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
margin-left: 5%;
width: 20%;
min-width: 200px;
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

export const RecordStartButton = styled.button`
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

export const RecordStopButton = styled.button`
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
margin-left: 5%;
width: 15%;
min-width: 200px;
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

export const SuccessDiv = styled.div`
  position: absolute;
  width: 30%;
  height: 30%;
  left: 35%;
  top: 35%;
  border-radius: 20px;
  display: flex;
  background-color: #fbeee0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Cafe24Ssurround';
  font-size: 1.5rem;
  z-index: 999;
`;
