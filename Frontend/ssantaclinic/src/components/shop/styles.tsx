import styled from 'styled-components';

export const ItemAlert = styled.div`
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

export const Button = styled.button`
  z-index: 4;
  position: relative;
  margin-left:10px;
  margin-right:10px;
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

export const ButtonDiv = styled.div`
  z-index: 4;
  display: flex;
  justify-content: space-evenly;
  }
`;

export const TextSpan = styled.span`
  color: red;
  font-size: 25px;
  margin-top: 15px;
`;

export const SuccessAlert = styled.div`
  z-index: 4;
  position: fixed;
  width: 60%;
  height: 40%;
  color: green;
  margin:auto;
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  width: 300px;
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
export const NextNumber = styled.span`
  z-index: 5;
  position: absolute;
  top:50%;
  right:30px;
  display:block;
  width: 12px;
  height:12px;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  transform: translateY(-50%) rotate(135deg);
  cursor: pointer;
  opacity:0;
  transition:0.5s;
  }
`;

export const PrevNumber = styled.span`
  z-index: 5;
  
  position: absolute;
  top:50%;
  left:30px;
  display:block;
  width: 12px;
  height:12px;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  transform: translateY(-50%) rotate(315deg);
  cursor: pointer;
  opacity:0;
  transition:0.5s;

  }
`;

export const NumberContainer = styled.div`
  z-index: 4;
  position: relative;
  margin-top:15px;
  width: 80px;
  height: 50px;
  border-radius: 40px;
  border: 3px solid rgba(177,177,255);
  transition: 0.5s;
  

  &:hover {
    
    width: 120px;
    border: 2px solid rgba(177,177,255);
    }
  &:hover ${NextNumber}  {
    opacity:1;
    right:20px;
  }  
  &:hover ${PrevNumber}  {
    opacity:1;
    left:20px;
  } 

  
  }
`;

export const NumberBox = styled.div`
  z-index: 4;
  position: absolute;
  width: 100%;
  height:100%;
  text-align: center;
  line-height:46px;
  // display:none;
  color: #00deff;
  font-size:24px;
  font-weight:700;
  user-select:none;
  
  }
`;
