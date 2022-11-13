import styled from 'styled-components';

export const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  #signup-text {
    font-family: 'Cafe24Ssurround';
    padding-top: 5%;
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

  #signup-form-card {
    width: 50%;
    height: 70%;
    background-color: #4e6f62;
    border-radius: 200px;
    margin: 0 auto;
  }
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  .signup-input {
    width: 50%;
    height: 50px;
    border-radius: 10px;
    margin: 5px;
  }
`;

export const SignUpInputs = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  .signup-input {
    width: 50%;
    height: 50px;
    border-radius: 10px;
    margin: 10px;
  }
  .check-button {
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
    margin: 10px;
  }
  @media (min-width: 768px) {
    .check-button {
      min-width: 150px;
      padding: 0 25px;
    }
  }
`;
export const SignUpFormCard = styled.div`
  width: 50%;
  height: 90%;
  background-color: #468c1f;
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
    margin-left: 1%;
  }

  @media (min-width: 768px) {
    #signup-button {
      min-width: 200px;
      padding: 0 25px;
    }
  }

  #find-password-button {
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
    margin-left: 2%;
  }

  @media (min-width: 768px) {
    #find-password-button {
      min-width: 200px;
      padding: 0 25px;
    }
  }
`;

export const FindPasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  #find-password-text {
    font-family: 'Cafe24Ssurround';
    padding-top: 5%;
  }
  #find-password-button {
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
    #find-password-button {
      min-width: 150px;
      padding: 0 25px;
    }
  }
`;

export const FindPasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .find-password-input {
    width: 30%;
    height: 50px;
    border-radius: 10px;
    margin: 5px;
  }
`;
