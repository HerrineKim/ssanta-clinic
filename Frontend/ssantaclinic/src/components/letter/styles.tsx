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
  #send-button {
    margin: 1% 48%;
  }
`;

export const Button = styled.button`
  width: 100px;
  height: 50px;
  color: white;
  background: green;
  border-radius: 10px;
  margin: 5px;
`;

export const TitleInput = styled.input`
  width: 80vw;
  height: 10vh;
  border-radius: 10px;
  background: #34502R;
  margin: 5px;
`;
export const MessageInput = styled.input`
  width: 80vw;
  height: 30vh;
  border-radius: 10px;
  background: #34502R;
  margin: 5px;
`;
export const CheckButton = styled.button`
  width: 100px;
  height: 50px;
  background: #ccffcc;
  border-radius: 10px;
  margin: 5px;
`;
