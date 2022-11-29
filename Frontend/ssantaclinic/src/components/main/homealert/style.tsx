import styled from 'styled-components';

export const HomeAlertDiv = styled.div`
  z-index: 4;
  position: relative;
  width: 60%;
  height: 40%;
  
  margin:auto;
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  width: 300px;
  display: flex;
  display: none;
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

export const InButton = styled.button`
  z-index: 4;
  position: relative;
 
  background-color: #561d18;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
  color: #ffbf00;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-family: 'Cafe24Ssurround';
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
    min-width: 40px;
    padding: 0 20px;
  }
`;
