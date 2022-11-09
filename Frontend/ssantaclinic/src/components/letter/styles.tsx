import styled from 'styled-components';

export const LetterWriteContainer = styled.div`
  display: flex;
  flex-direction: column;

  #header {
    margin: 2% auto;
  }
  #set-category {
    margin: 1% auto;
  }
  #title-container {
    margin: 1% 10%;
  }
  #message-container {
    margin: 1% 10%;
  }
  .send-button {
    margin: 1% 48%;
  }
`;

export const Button = styled.button`
background-color: #fbeee0;
border: 2px solid #422800;
border-radius: 30px;
box-shadow: #422800 4px 4px 0 0;
color: #422800;
cursor: pointer;
display: inline-block;
font-weight: 600;
font-size: 18px;
padding: 0 18px;
line-height: 50px;
text-align: center;
text-decoration: none;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
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

export const TitleInput = styled.input`
  width: 50vw;
  height: 10vh;
  border-radius: 10px;
  background: #34502R;
  margin: 5px;
`;
export const MessageInput = styled.input`
  width: 25vw;
  height: 60vh;
  border-radius: 10px;
  background: #34502R;
  margin: 5px;
`;
export const CheckButton = styled.button`
  background-color: #424b35;
  border: 2px solid #171e13;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin: 2px
  }

  :hover {
  background-color: #561d18;
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
