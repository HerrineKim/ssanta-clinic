import styled from 'styled-components';
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  #letter-receive-page-container {
    height: 100%;
  }
`;

export const CanvasContainer = styled.div`
  height: 100%;
`;
export const LetterPageContainer = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 30px;
  bottom: 4%;

  #write-back-button {
    font-family: 'Cafe24Ssurround';
    margin-left: 10%;
  }
  #receive-back-button {
    position: absolute;
    font-family: 'Cafe24Ssurround';
    top: 87%;
    margin-left: 10%;
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
  bottom: 20%
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
