import styled from 'styled-components';

export const LetterContainer = styled.div`
  height: 100%;
  #message-input {
    posision: absoloute;
  }
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

    #check-btn {
      background-color: #561d18;
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
      margin: 2px;
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
      }
    }
    #non-check-btn {
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
      margin: 2px;
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
      }
    }
  }
  #description {
    width: 30%;
    position: absolute;
    display: inline-block;
    float: right;
    margin-left: 68%;
    margin-top: 10%;
    h3 {
      color: white;
      font-family: 'Cafe24Ssurround';
      text-align: center;
      margin-top: 3%;
    }
  }
  #title-container {
    margin: 1% 10%;
  }
  #message-container {
    height: 100%;
    margin: 0 10%;
    text-align: center;
    display: flex;
    flex-direction: column;
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
export const MessageInput = styled.textarea`
  width: 30%;
  height: 22vw;

  margin: 0 auto;
  background: #f8f4e5;
  resize: none;

  border: 2px solid #422800;
  border-radius: 10px;

  font-family: 'IMRegular';
  font-size: 1.2rem;
  color: #422800;
  padding: 2%;
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
export const Message = styled.div`
  width: 30%;
  height: 70%;
  background: #f8f4e5;
  margin-top: 15%;
  margin-left: 32.6%;
  word-wrap: break-word;

  width: 35%;
  height: 22vw;

  border: 2px solid #422800;
  border-radius: 10px;

  font-family: 'IMRegular';
  font-size: 1.2rem;
  color: #422800;
  padding: 1%;
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

export const LetterListContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #033220;
  text-align: center;
  overflow-y: scroll;
  .letter-title{
    font-family: 'Cafe24Ssurround';
  }
  #letterbox {
    background-color: #ffffff;
    width: 50%;
    height: 8%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 20px;
    margin-left: 24%;
    box-shadow: 5px 5px 5px 5px;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
`;
export const ReceiveLetterContainer = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 10%;
`;
export const LetterSanta = styled.div``;

export const SendAlertDiv = styled.div`
  z-index: 4;
  position: fixed;
  width: 30%;
  height: 40%;
  left: 35%;
  top:30%;
  
  
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  
  display: flex;
  
  flex-direction: column;
  align-items:center;
  justify-content:center;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
  
  
  touch-action: manipulation;
  font-family: 'Cafe24Ssurround';
  }
`;
