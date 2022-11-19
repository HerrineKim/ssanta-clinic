import styled from 'styled-components';

export const CountdownDiv = styled.div`
  width: 40%;
`;

export const BoxNumText = styled.div`
  font-size: 1rem;
  font-family: 'IMRegular';
  // text-align: center;
  color: #d6cfc7;
  // font-weight: 700;
  // text-shadow: 1px 1px 0px #eb452b, 2px 2px 0px #efa032, 3px 3px 0px #46b59b,
  // 4px 4px 0px #017e7f, 5px 5px 0px #052939, 6px 6px 0px #c11a2b;
`;

export const MyCalendarTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: end;
  font-family: 'Cafe24Ssurround';
  font-size: 2.5rem;
  font-weight: 700;
  color: #f6eed7;
  margin-top: 1%;
`;

export const PresentButton = styled.button`
  min-width: 130px;
  font-family: 'Cafe24Ssurround';
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1.5%;
  transition: all 0.3s;
  &:hover {
    background-color: #422800;
    color: #fbeee0;
  }
`;

export const CalendarBackground = styled.div`
  position: absolute;
  top: 1.5%;
  left: 1.5%;
  width: 97%;
  height: 97%;
  background-color: #151515;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-around;
  width: 90vw;
`;

export const CalendarPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 85vh;
  width: 90vw;
`;

export const CalendarTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: end;
  font-family: 'Cafe24Ssurround';
  font-size: 2rem;
  font-weight: 700;
  color: #f6eed7;
  width: 105%;
  margin-top: 1%;
  margin-right: 1%;
`;

// 좌측 영역
export const CalendarLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: space-around;
  height: 80vh;
  width: 40vw;
  // background-color: pink;
`;
// 좌측 상단 미니 컨테이너
export const MiniContainerOne = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 20vh;
  width: 40vw;
  // background-color: orange;
`;

export const BoxOne = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 9vw;
  background-color: #2f3029;
  border-radius: 8px;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6eed7;
`;

export const BoxTwo = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 18vw;
  border-radius: 8px;
  font-size: 5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6eed7;
  background: #b73a3c;
  background-image: radial-gradient(#9e2b2b 20%, transparent 0),
    radial-gradient(#9e2b2b 20%, transparent 0);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
`;

export const BoxThree = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  padding: 1vh 1vw;
  height: 18vh;
  width: 9vw;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
  border-radius: 8px;
  background: radial-gradient(#9e2b2b 3px, transparent 4px),
    radial-gradient(#9e2b2b 3px, transparent 4px),
    linear-gradient(#f6eed7 4px, transparent 0),
    linear-gradient(
      45deg,
      transparent 74px,
      transparent 75px,
      #b73a3c 75px,
      #b73a3c 76px,
      transparent 77px,
      transparent 109px
    ),
    linear-gradient(
      -45deg,
      transparent 75px,
      transparent 76px,
      #b73a3c 76px,
      #b73a3c 77px,
      transparent 78px,
      transparent 109px
    ),
    #f6eed7;
  background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
  background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
`;

// 좌측 중간 미니 컨테이너
export const MiniContainerTwo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 40vh;
  width: 40vw;
  padding-left: 0.5vw;
  // background-color: brown;
`;

export const BoxEight = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 38vh;
  width: 9vw;
  border-radius: 8px;
  font-size: 5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
  background: linear-gradient(135deg, #94a891 25%, transparent 25%) -10px 0,
    linear-gradient(225deg, #94a891 25%, transparent 25%) -10px 0,
    linear-gradient(315deg, #94a891 25%, transparent 25%),
    linear-gradient(45deg, #94a891 25%, transparent 25%);
  background-size: 20px 20px;
  background-color: #b8c7b0;
`;

export const MiniContainerTwoRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 40vh;
  width: 31vw;
  // background-color: skyblue;
`;

export const MiniContainerTwoTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 20vh;
  width: 30vw;
  // background-color: skyblue;
`;

export const BoxNine = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  padding: 1vh 1vw;
  height: 18vh;
  width: 9vw;
  background-color: #b73a3c;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6eed7;
`;

export const BoxTen = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  height: 18vh;
  width: 19vw;
  padding: 1vh 1vw;
  background-color: #f6eed7;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
`;

export const MiniContainerTwoBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 20vh;
  width: 29vw;
`;

export const BoxThirteen = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 9vw;
  border-radius: 8px;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
  background: repeating-linear-gradient(
    45deg,
    #f6ebd4,
    #f6ebd4 10px,
    #dcc6a3 10px,
    #dcc6a3 20px
  );
`;

export const BoxFourteen = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 9vw;
  background-color: yellow;
  border-radius: 8px;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
  background: linear-gradient(135deg, #94a891 25%, transparent 25%) -10px 0,
    linear-gradient(225deg, #94a891 25%, transparent 25%) -10px 0,
    linear-gradient(315deg, #94a891 25%, transparent 25%),
    linear-gradient(45deg, #94a891 25%, transparent 25%);
  background-size: 20px 20px;
  background-color: #b8c7b0;
`;

export const BoxFifteen = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: end;
  height: 18vh;
  width: 9vw;
  padding: 1vh 1vw;
  background-color: #b73a3c;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6eed7;
`;

export const MiniContainerThree = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 19vh;
  width: 39vw;
  // background-color: mintcream;
`;

export const BoxTwentyOne = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 19vw;
  margin-left: 0.5vw;
  background-color: blue;
  border-radius: 8px;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6eed7;
  background: linear-gradient(135deg, #9e2b2b 25%, transparent 25%) -10px 0,
    linear-gradient(225deg, #9e2b2b 25%, transparent 25%) -10px 0,
    linear-gradient(315deg, #9e2b2b 25%, transparent 25%),
    linear-gradient(45deg, #9e2b2b 25%, transparent 25%);
  background-size: 20px 20px;
  background-color: #b73a3c;
`;

export const BoxTwentyTwo = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 9vw;
  background-color: blue;
  border-radius: 8px;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6eed7;
  background: #2e2f28;
  background-image: radial-gradient(#4a4b44 20%, transparent 0),
    radial-gradient(#4a4b44 20%, transparent 0);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
`;

export const BoxTwentyThree = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  height: 18vh;
  width: 9vw;
  border-radius: 8px;
  padding: 1vh 1vw;
  background-color: #f6eed7;
  border-radius: 8px;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #2e2f28;
`;

// 가운데 영역
export const CalendarMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.5vw;
  justify-content: space-between;
  height: 78vh;
  width: 10vw;
`;

export const BoxFour = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38vh;
  width: 9vw;
  border-radius: 8px;
  padding: 1vh 1vw;
  background-color: #b8c7b0;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #2e2f28;
`;

export const BoxSixteen = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: start;
  justify-content: end;
  height: 38vh;
  width: 9vw;
  background-color: darkgreen;
  border-radius: 8px;
  padding: 1vh 1vw;
  background-color: #2e2f28;
  font-size: 3.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6eed7;
`;

// 우측 영역
export const CalendarRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 40vw;
  // background-color: yellow;
`;

// 우측 상단 미니 영역
export const MiniContainerFour = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 20vh;
  width: 40vw;
  // background-color: orange;
`;

export const BoxFive = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 9vw;
  border-radius: 8px;
  font-size: 5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6eed7;
  background: repeating-linear-gradient(
    45deg,
    #b73a3c,
    #b73a3c 10px,
    #9e2b2b 10px,
    #9e2b2b 20px
  );
`;

export const BoxSix = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 19vw;
  border-radius: 8px;
  font-size: 5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
  background: repeating-linear-gradient(
    45deg,
    #f6ebd4,
    #f6ebd4 10px,
    #dcc6a3 10px,
    #dcc6a3 20px
  );
`;

export const BoxSeven = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: start;
  justify-content: start;
  height: 18vh;
  width: 9vw;
  padding: 1vh 1vw;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
  background-color: #b8c7b0;
  border-radius: 8px;
`;

// 우측 중간 미니 영역
export const MiniContainerFive = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 20vh;
  width: 40vw;
  // background-color: grey;
`;

export const BoxEleven = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: start;
  justify-content: start;
  height: 18vh;
  width: 20vw;
  padding: 1vh 1vw;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6ebd4;
  background-color: #282720;
  border-radius: 8px;
`;

export const BoxTwelve = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 19vw;
  padding: 1vh 1vw;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
  background-color: #f6ebd4;
  border-radius: 8px;
`;

// 우측 하단 미니 영역
export const MiniContainerSix = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40vh;
  width: 40vw;
  // background-color: pink;
`;

export const MiniContainerSeven = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  height: 40vh;
  width: 10vw;
  // background-color: orange;
`;

export const BoxSeventeen = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 9vw;
  padding: 1vh 1vw;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6ebd4;
  background-color: #b73a3c;
  border-radius: 8px;
`;

export const BoxTwentyFour = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: start;
  justify-content: end;
  height: 18vh;
  width: 9vw;
  padding: 1vh 1vw;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #b73a3c;
  background-color: #f6ebd4;
  border-radius: 8px;
`;

export const MiniContainerEight = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38vh;
  width: 10vw;
  padding: 1vh 1vw;
  margin-right: 1vw;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #282720;
  background-color: #b8c7b0;
  border-radius: 8px;
`;

export const MiniContainerNine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: space-around;
  height: 40vh;
  width: 10vw;
`;

export const BoxNineteen = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  align-items: center;
  justify-content: center;
  height: 18vh;
  width: 9vw;
  border-radius: 8px;
  padding: 1vh 1vw;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #b8c7b0;
  background-color: #f6ebd4;
  border-radius: 8px;
`;

export const BoxTwentyFive = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  align-items: start;
  justify-content: end;
  height: 18vh;
  width: 9vw;
  border-radius: 8px;
  padding: 1vh 1vw;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6ebd4;
  background-color: #282720;
  border-radius: 8px;
`;

export const MiniContainerTen = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 38vh;
  width: 9vw;
  border-radius: 8px;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Cafe24Ssurround';
  color: #f6ebd4;
  background-color: #b8c7b0;
  border-radius: 8px;
`;
export const CloseButton = styled.div`
min-width: 50px;
background-color: #fbeee0;
border: 2px solid #422800;
border-radius: 30px;
box-shadow: #422800 4px 4px 0 0;
color: #422800;
cursor: pointer;
display: inline-block;
font-weight: 600;
font-size: 1.5rem;
text-align: center;
text-decoration: none;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
z-index: 999;
font-family: 'Cafe24Ssurround';
}

:hover {
background-color: #fff;
}

:active {
box-shadow: #422800 2px 2px 0 0;
transform: translate(2px, 2px);
}

`;
