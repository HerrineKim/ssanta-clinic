import styled from 'styled-components';

export const Div = styled.div`
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  z-index: 2;
  background-color: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid;
`;

export const TitleLetterContainer = styled.div`
  width: 100%;
  background-color: #033220;
  text-align: center;

  h1 {
    margin-top: 3%;
    color: #ffffff;
    font-family: 'Cafe24Ssurround';
  }
`;

export const ButtonLetterContainer = styled.div`
  width: 100%;
  background-color: #81988f;
  text-align: center;
  h1 {
    margin-top: 3%;
    color: #ffffff;
    font-family: 'Cafe24Ssurround';
  }
  button {
    font-family: 'Cafe24Ssurround';
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
    margin: 2% 3%;
    touch-action: manipulation;
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
    }
  }
`;
export const LetterSanta = styled.div`
  margin-left: 10%;
`;
