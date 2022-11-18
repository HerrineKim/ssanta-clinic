import styled from 'styled-components';

export const DescriptionModalContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  overflow-y: scroll;
  #title {
    font-size: 70px;
    font-family: 'Cafe24Ssurround';
  }
  #title-description {
    font-family: 'IMRegular';
    font-size: 30px;
    margin-top: 1%;
    margin-bottom: 1%;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

export const DescriptionModalCloseButton = styled.button`
  position: absolute;
  background-color: #fbeee0;
  width: 5%;
  height: 5%;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
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

export const SmallTitle = styled.h2`
  font-family: 'Cafe24Ssurround';
  font-size: 50px;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2%;
  margin-bottom: 2%;
  font-family: 'IMRegular';
  font-size: 30px;
`;

export const Text = styled.p`
  margin-top: 1%;
  padding-bottom: 2%;
`;

export const DescriptionImg = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 20px;
`;

export const DescriptionGameImg = styled.img`
  width: 30%;
  height: 20%;
  border-radius: 20px;
`;
