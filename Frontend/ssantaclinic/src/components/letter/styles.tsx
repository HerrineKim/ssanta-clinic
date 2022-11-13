import styled from 'styled-components';

export const LetterContainer = styled.div`
  height: 100%;

  #header {
    margin-left: 75%;
    margin-top: 5%;
    h1 {
      font-size: 20px;
      right: 10%;
      color: white;
      font-family: 'Cafe24Ssurround';
    }
  }
  #set-category {
    display: inline-block;
    float: right;
    margin-left: 62%;
    margin-top: 3%;
  }
  #title-container {
    margin: 1% 10%;
  }
  #message-container {
    margin: 0 10%;
    text-align: center;
  }
  .send-button {
    float: right;
    margin-right: 13%;
    font-family: 'Cafe24Ssurround';
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
    min-width: 150px;
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
  width: 30%;
  height: 22vw;
  border-radius: 10px;
  background: #34502R;
`;
export const Message = styled.div`
  width: 25vw;
  height: 60vh;
  border-radius: 10px;
  background: white;
  margin: 5px;
  margin-bottom: 10%;
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
    min-width: 150px;
    padding: 0 25px;
  }
`;
