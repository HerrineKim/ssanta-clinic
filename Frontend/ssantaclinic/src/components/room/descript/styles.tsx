import styled from 'styled-components';

export const DisContainer = styled.div`
  position: absolute;

  background: rgba(255, 255, 255, 0.6);
  top: 0;
  height: 100%;
  width: 100%;
  // opacity: 0.5;
  border-radius: 10px;
`;

export const CalendarContainer = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  height: 30%;
  width: 40%;
  opacity: 0.5;
  border-radius: 10px;

  box-shadow: 10px rgba(0, 0, 0, 0.2);
`;

export const TextContainer = styled.div`
  position: absolute;

  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  width: 300px;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
  font-family: 'Cafe24Ssurround';

  background-color: #fbeee0;
  top: 0;
  left: 0;
  height: 100%;
  width: 60%;

  border-radius: 10px;
`;

export const TreeContainer = styled.div`
  position: absolute;
  background: #ffffff
  top: 0;
  right: 0;
  height: 30%;
  width: 50%;
  opacity: 0.5;
  border-radius: 10px;

  box-shadow: 10px rgba(0, 0, 0, 0.2);
`;

export const ArrowImg = styled.img`
  transform: rotate(45deg);
  width: 30%;
  height: auto;
  opacity: 0.6;
  display: block;
  margin-left: 60%;
  margin-top: 30%;
`;

export const Arrow = styled.img`
  transform: rotate(140deg);
  width: 30%;
  height: auto;
  opacity: 0.6;
  display: block;

  margin-top: 40%;
`;
export const Arr = styled.img`
  transform: rotate(90deg);
  width: 30%;
  height: auto;
  opacity: 0.6;
  display: block;

  margin-top: 100px;
`;

export const Mouse = styled.img`
  width: 30%;
  height: auto;
  opacity: 0.6;
  display: inline-block;
`;

export const CalendarAlertDiv = styled.div`
  z-index: 4;
  position: fixed;
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
  font-family: 'Cafe24Ssurround';
  
  
  touch-action: manipulation;
  }
`;

export const CalandarTextContainer = styled.div`
  position: absolute;

  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  width: 300px;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
  font-family: 'Cafe24Ssurround';

  background-color: #fbeee0;
  top: 0;
  right: 10%;
  height: 100%;
  width: 60%;

  border-radius: 10px;
`;

export const ItemTextContainer = styled.div`
  position: absolute;

  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
  font-family: 'Cafe24Ssurround';

  background-color: #fbeee0;
  top: 0;
  right: 0%;
  height: 50%;
  width: 100%;

  border-radius: 10px;
`;
