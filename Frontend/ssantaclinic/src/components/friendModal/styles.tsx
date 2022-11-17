import styled from 'styled-components';

export const FriendModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const FriendModalTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: 0 10px;
`;

export const FriendSearchInput = styled.input`
  width: 80%;
  height: 80%;
  border-radius: 10px;
  margin: 5px;
  padding: 0 10px;
  font-family: 'Cafe24Ssurround';
  font-size: 2rem;
`;

export const FriendModalCloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbeee0;
  width: 6%;
  height: 55%;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  font-family: 'Cafe24Ssurround';
  margin: 0;
  margin-right: 1%;
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
    min-width: 10px;
  }
`;

export const FriendModalBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  padding: 0 10px;
`;

export const FollowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 10px;
  overflow-y: scroll;
`;

export const FollowerText = styled.div`
  width: 100%;
  height: 10%;
  margin: 5% 0;
  font-family: 'Cafe24Ssurround';
  font-size: 2.5rem;
  color: #422800;
`;

export const PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FollowListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  width: 100%;
`;

export const FollowEmoji = styled.div`
  width: 10%;
  height: 100%;
  font-size: 1.5rem;
`;

export const FollowNickName = styled.div`
  width: 90%;
  height: 100%;
  font-family: 'IMRegular';
  font-size: 1.5rem;
  margin-left: 2%;
  color: black;
`;

export const FollowingContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 10px;
  overflow-y: scroll;
`;

export const FollowingText = styled.div`
  width: 100%;
  height: 10%;
  margin: 5% 0;
  font-family: 'Cafe24Ssurround';
  font-size: 2.5rem;
  color: #422800;
`;

export const SearchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  z-index: 1;
`;

export const FriendInfoText = styled.div`
  width: 100%;
  margin-left: 5%;
  font-family: 'IMRegular';
  font-size: 1.2rem;
  color: #422800;
`;
