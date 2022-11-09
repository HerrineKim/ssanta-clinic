import styled from 'styled-components';

export const SignUpContainer = styled.div`
  width: 100%;
  height: 100%;
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

export const Input = styled.input`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background: #34502R;
  margin: 5px;
`;

export const CheckButton = styled.button`
  width: 100px;
  height: 50px;
  background: #ccffcc;
  border-radius: 10px;
`;

export const LoginContainer = styled.div`
  h1 {
    color: white;
  }

  #login-button {
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

  @media (min-width: 768px) {
    #login-button {
      min-width: 120px;
      padding: 0 25px;
    }
  }

  #signup-button {
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

  @media (min-width: 768px) {
    #signup-button {
      min-width: 150px;
      padding: 0 25px;
    }
  }
`;
