import styled from 'styled-components';

export const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Div = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
`;
export const ShopDiv = styled.div`
  position: relative;
  display: flex;
  left: 50%;
`;

export const ModalDiv = styled.div`
  position: absolute;
  top: 100px;
  left: 200px;
  width: 50%;
  height: 60%;
  display: none;
  background-color: green;
  z-index: 4;
`;

// 친구 modal
export const FriendModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 70vh;
  overflow: auto;
  // 스크롤바 기능은 있지만
  ::-webkit-scrollbar {
    display: none;
  }
`;

// 상단 Container
export const FriendModalTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 0 10px;
  background-color: green;
`;

// 하단 Container
export const FriendModalBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  padding: 0 10px;
  background-color: #fbeee0;
`;

// 좌측: 팔로워 Container
export const FollowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 10px;
  background-color: #fbeee0;
  border-right: 2px solid #422800;
`;

// 우측: 팔로잉 Container
export const FollowingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 10px;
  background-color: #fbeee0;
`;

export const MoneyState = styled.div`
  z-index: 4;
  position: relative;
  margin-right:20px;
  height: 50px;
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  width: 300px;
  display: flex;
  align-items:center;
  // display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-family: 'Cafe24Ssurround';
  }



  @media (min-width: 768px) {
  {
    min-width: 40px;
    padding: 0 20px;
  }
`;
export const CoinImg = styled.img`
  position: relative;

  height: 50px;
  background-size: cover;
`;
export const DescriptionButton = styled.button`
z-index: 4;
position: relative;
margin-right: 20px;
margin-top:0px;
background-color: #fbeee0;
border: 2px solid #422800;
border-radius: 30px;
box-shadow: #422800 4px 4px 0 0;
color: #422800;
cursor: pointer;
display: flex;
justify-content:center;
align-items:center;
font-weight: 600;
font-size: 1.5rem;
padding: 0 18px;
text-align: center;
text-decoration: none;
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

export const ItemButton = styled.button`
  z-index: 4;
  position: relative;
  margin-right: 20px;
  width: 200px;
  background-color: #fbeee0;
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
export const BottomBar = styled.div`
  z-index: 4;
  display: flex;
  width: 100%;
  margin-top: 0px;
  position: absolute;
  bottom: 0;
  height: 100px;
  justify-content: end;
  padding-right: 30px;
`;

export const LogoutButton = styled.button`
  z-index: 4;
  position: relative;
  margin-right: 20px;
  margin-top:0px;
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: flex;
  justify-content:center;
  align-items:center;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
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

export const TopBar = styled.div`
  z-index: 4;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  height: 100px;
  justify-content: end;
  padding-right: 30px;
  align-items: center;
`;

export const FriendButton = styled.button`
  z-index: 4;
  position: relative;
 
  background-color: #fbeee0;
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
export const NotiConTainer = styled.div`
  width: 100px;
  z-index: 1;
  position: relative;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
`;
export const NotiButton = styled.button`  
z-index: 4;
position: absolute;

background-color: #fbeee0;
border: 2px solid #422800;
border-radius: 30px;
box-shadow: #422800 4px 4px 0 0;
color: #422800;
cursor: pointer;

font-weight: 600;
font-size: 1.5rem;
padding: 0 18px;
text-align: center;
text-decoration: none;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
font-family: 'Cafe24Ssurround';
z-index: 1;
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
}`;

export const NotiCount = styled.div`
  position: absolute;
  width: 25%;
  height: 3vh;
  color: white;
  background: #ff6600;
  text-align: center;
  border-radius: 20px;
  line-height: 32px;
  font-family: 'Cafe24Ssurround';
  margin-left: 60%;

  margin-top: 15%;
  z-index: 10;
`;

export const ShopTalk = styled.div`
  z-index: 4;
  position: fixed;
  margin: auto;
  left: 40%;
  bottom: 50px;
  height: 150px;
  width: 370px;
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  display: flex;
  align-items:center;
  
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0 18px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-family: 'Cafe24Ssurround';
  }



  @media (min-width: 768px) {
  {
    min-width: 40px;
    padding: 0 20px;
  }
`;
