import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './calendar.css';
import './modalAnimation.scss';
import { CalendarDetail } from '../calendar/calendarDetail/index';
import { BoxCreate } from './boxCreate';
import { API_BASE_URL } from '../../apis/url';
// Recoil
import { selectUserNickname } from '../../store/store';
import { selectUserId } from '../../store/store';
import { useRecoilValue } from 'recoil';

import Countdown from 'react-countdown';
import {
  TopContainer,
  PresentButton,
  BoxNumText,
  CountdownDiv,
} from './styles';
import { CalendarBackground } from './styles';
import { CalendarPageContainer } from './styles';
import { CalendarLeftContainer } from './styles';
// 좌측 상단
import { MyCalendarTitle, CloseButton } from './styles';
import { MiniContainerOne } from './styles';
import { BoxOne } from './styles';
import { BoxTwo } from './styles';
import { BoxThree } from './styles';
// 좌측 중간
import { MiniContainerTwo } from './styles';
import { BoxEight } from './styles';
import { MiniContainerTwoRight } from './styles';
import { MiniContainerTwoTop } from './styles';
import { BoxNine } from './styles';
import { BoxTen } from './styles';
import { MiniContainerTwoBottom } from './styles';
import { BoxThirteen } from './styles';
import { BoxFourteen } from './styles';
import { BoxFifteen } from './styles';
// 좌측 하단
import { MiniContainerThree } from './styles';
import { BoxTwentyOne } from './styles';
import { BoxTwentyTwo } from './styles';
import { BoxTwentyThree } from './styles';

import { CalendarMiddleContainer } from './styles';
import { BoxFour } from './styles';
import { BoxSixteen } from './styles';
import { CalendarRightContainer } from './styles';
// 우측 상단
import { MiniContainerFour } from './styles';
import { BoxFive } from './styles';
import { BoxSix } from './styles';
import { BoxSeven } from './styles';
// 우측 중간
import { MiniContainerFive } from './styles';
import { BoxEleven } from './styles';
import { BoxTwelve } from './styles';
// 우측 하단
import { MiniContainerSix } from './styles';
import { BoxSeventeen } from './styles';
import { BoxTwentyFour } from './styles';
import { MiniContainerSeven } from './styles';
import { MiniContainerEight } from './styles';
import { MiniContainerNine } from './styles';
import { BoxNineteen } from './styles';
import { BoxTwentyFive } from './styles';
import { MiniContainerTen } from './styles';

export function CalendarModal(props: any) {
  const BASE_URL = API_BASE_URL;

  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const nickName = useRecoilValue(selectUserNickname);
  const userId = useRecoilValue(selectUserId);
  const [boxDate, setBoxDate] = useState<number>(1);

  const [Boxes, setBoxes] = useState<any[]>([]);
  const getBoxes = (date: string) => {
    axios
      .get(`${BASE_URL}calendar?date=${date}`, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        setBoxes(res.data);
        console.log(res.data);
      });
  };
  // 캘린더 날짜 별 개수 가져오기(api/calendar/userId=int)
  const [boxNums, setBoxNums] = useState<any[]>([]);
  // [{"date":1,"cnt":0},{"date":2,"cnt":1},{"date":3,"cnt":0}]
  useEffect(() => {
    axios
      .get(`${BASE_URL}calendar?userId=${userId}`, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        setBoxNums(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ACCESS_TOKEN, userId]);

  // 어드벤트 캘린더 박스 클릭했는데 오늘이 2022년 12월 25일 이전이면 이동 되지 않고 경고창 띄우기
  const notYet = () => {
    // 만약 오늘이 2022년 12월 25일 이전이면 경고창 띄우기
    if (new Date().getTime() < new Date('2022-12-25').getTime()) {
      alert('아직 열어볼 수 없어요!');
    }
  };

  // Christmas Countdown renderer
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <span>🎄🎄🎄</span>;
    } else {
      // Render a countdown
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            alignItems: 'end',
            fontSize: '2rem',
            color: 'white',
            fontFamily: 'Cafe24Ssurround',
            width: '100%',
          }}
        >
          <span>
            {days}일 {hours}시간 {minutes}분 {seconds}초
          </span>
          <span role="img" aria-label="christmas_tree">
            🎄
          </span>
        </div>
      );
    }
  };

  // 일별 모달창 노출 여부
  const [calendarDetailOpen, setCalendarDetailOpen] = useState<boolean>(false);
  const showCalendarDetail = () => {
    setCalendarDetailOpen(true);
  };

  return (
    <CalendarBackground>
      <CalendarDetail
        setCalendarDetailOpen={setCalendarDetailOpen}
        calendarDetailOpen={calendarDetailOpen}
        date={boxDate}
        Boxes={Boxes}
        // 해당 박스 번호
      ></CalendarDetail>
      <TopContainer>
        <MyCalendarTitle>
          {nickName}님의{' '}
          {
            // 오늘 연도
            new Date().getFullYear()
          }
          년 어드벤트 캘린더
        </MyCalendarTitle>
        {/* 크리스마스 카운터 */}
        <CountdownDiv>
          <Countdown
            date={
              // 2022년 12월 25일 00시 00분 00초
              new Date(2022, 11, 25, 0, 0, 0)
            }
            renderer={renderer}
          />
        </CountdownDiv>
      </TopContainer>
      <CalendarPageContainer>
        <CalendarLeftContainer>
          <MiniContainerOne>
            {/* 모달 오픈 */}
            <BoxOne
              onClick={() => {
                setBoxDate(1);
                getBoxes('1');
                showCalendarDetail();
              }}
            >
              1
              {boxNums.map((boxNum) => {
                if (boxNum.date === 1) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxOne>
            <BoxTwo
              onClick={() => {
                setBoxDate(2);
                getBoxes('2');
                showCalendarDetail();
              }}
            >
              2
              {boxNums.map((boxNum) => {
                if (boxNum.date === 2) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxTwo>
            <BoxThree
              onClick={() => {
                setBoxDate(3);
                getBoxes('3');
                showCalendarDetail();
              }}
            >
              3
              {boxNums.map((boxNum) => {
                if (boxNum.date === 3) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxThree>
          </MiniContainerOne>
          <MiniContainerTwo>
            <BoxEight
              onClick={() => {
                setBoxDate(8);
                getBoxes('8');
                showCalendarDetail();
              }}
            >
              8
              {boxNums.map((boxNum) => {
                if (boxNum.date === 8) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxEight>
            <MiniContainerTwoRight>
              <MiniContainerTwoTop>
                <BoxNine
                  onClick={() => {
                    setBoxDate(9);
                    getBoxes('9');
                    showCalendarDetail();
                  }}
                >
                  9
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 9) {
                      return (
                        <BoxNumText key={boxNum.date}>
                          {boxNum.cnt}개
                        </BoxNumText>
                      );
                    }
                  })}
                </BoxNine>
                <BoxTen
                  onClick={() => {
                    setBoxDate(10);
                    getBoxes('10');
                    showCalendarDetail();
                  }}
                >
                  10
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 10) {
                      return (
                        <BoxNumText key={boxNum.date}>
                          {boxNum.cnt}개
                        </BoxNumText>
                      );
                    }
                  })}
                </BoxTen>
              </MiniContainerTwoTop>
              <MiniContainerTwoBottom>
                <BoxThirteen
                  onClick={() => {
                    setBoxDate(13);
                    getBoxes('13');
                    showCalendarDetail();
                  }}
                >
                  13
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 13) {
                      return (
                        <BoxNumText key={boxNum.date}>
                          {boxNum.cnt}개
                        </BoxNumText>
                      );
                    }
                  })}
                </BoxThirteen>
                <BoxFourteen
                  onClick={() => {
                    setBoxDate(14);
                    getBoxes('14');
                    showCalendarDetail();
                  }}
                >
                  14
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 14) {
                      return (
                        <BoxNumText key={boxNum.date}>
                          {boxNum.cnt}개
                        </BoxNumText>
                      );
                    }
                  })}
                </BoxFourteen>
                <BoxFifteen
                  onClick={() => {
                    setBoxDate(15);
                    getBoxes('15');
                    showCalendarDetail();
                  }}
                >
                  15
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 15) {
                      return (
                        <BoxNumText key={boxNum.date}>
                          {boxNum.cnt}개
                        </BoxNumText>
                      );
                    }
                  })}
                </BoxFifteen>
              </MiniContainerTwoBottom>
            </MiniContainerTwoRight>
          </MiniContainerTwo>
          <MiniContainerThree>
            <BoxTwentyOne
              onClick={() => {
                setBoxDate(21);
                getBoxes('21');
                showCalendarDetail();
              }}
            >
              21
              {boxNums.map((boxNum) => {
                if (boxNum.date === 21) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxTwentyOne>
            <BoxTwentyTwo
              onClick={() => {
                setBoxDate(22);
                getBoxes('22');
                showCalendarDetail();
              }}
            >
              22
              {boxNums.map((boxNum) => {
                if (boxNum.date === 22) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxTwentyTwo>
            <BoxTwentyThree
              onClick={() => {
                setBoxDate(23);
                getBoxes('23');
                showCalendarDetail();
              }}
            >
              23
              {boxNums.map((boxNum) => {
                if (boxNum.date === 23) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxTwentyThree>
          </MiniContainerThree>
        </CalendarLeftContainer>
        <CalendarMiddleContainer>
          <BoxFour
            onClick={() => {
              setBoxDate(4);
              getBoxes('4');
              showCalendarDetail();
            }}
          >
            4
            {boxNums.map((boxNum) => {
              if (boxNum.date === 4) {
                return (
                  <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                );
              }
            })}
          </BoxFour>
          <BoxSixteen
            onClick={() => {
              setBoxDate(16);
              getBoxes('16');
              showCalendarDetail();
            }}
          >
            16
            {boxNums.map((boxNum) => {
              if (boxNum.date === 16) {
                return (
                  <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                );
              }
            })}
          </BoxSixteen>
        </CalendarMiddleContainer>
        <CalendarRightContainer>
          <MiniContainerFour>
            <BoxFive
              onClick={() => {
                setBoxDate(5);
                getBoxes('5');
                showCalendarDetail();
              }}
            >
              5
              {boxNums.map((boxNum) => {
                if (boxNum.date === 5) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxFive>
            <BoxSix
              onClick={() => {
                setBoxDate(6);
                getBoxes('6');
                showCalendarDetail();
              }}
            >
              6
              {boxNums.map((boxNum) => {
                if (boxNum.date === 6) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxSix>
            <BoxSeven
              onClick={() => {
                setBoxDate(7);
                getBoxes('7');
                showCalendarDetail();
              }}
            >
              7
              {boxNums.map((boxNum) => {
                if (boxNum.date === 7) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxSeven>
          </MiniContainerFour>
          <MiniContainerFive>
            <BoxEleven
              onClick={() => {
                setBoxDate(11);
                getBoxes('11');
                showCalendarDetail();
              }}
            >
              11
              {boxNums.map((boxNum) => {
                if (boxNum.date === 11) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxEleven>
            <BoxTwelve
              onClick={() => {
                setBoxDate(12);
                getBoxes('12');
                showCalendarDetail();
              }}
            >
              12
              {boxNums.map((boxNum) => {
                if (boxNum.date === 12) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </BoxTwelve>
          </MiniContainerFive>
          <MiniContainerSix>
            <MiniContainerSeven>
              <BoxSeventeen
                onClick={() => {
                  setBoxDate(17);
                  getBoxes('17');
                  showCalendarDetail();
                }}
              >
                17
                {boxNums.map((boxNum) => {
                  if (boxNum.date === 17) {
                    return (
                      <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                    );
                  }
                })}
              </BoxSeventeen>
              <BoxTwentyFour
                onClick={() => {
                  setBoxDate(24);
                  getBoxes('24');
                  showCalendarDetail();
                }}
              >
                24
                {boxNums.map((boxNum) => {
                  if (boxNum.date === 24) {
                    return (
                      <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                    );
                  }
                })}
              </BoxTwentyFour>
            </MiniContainerSeven>
            <MiniContainerEight
              onClick={() => {
                setBoxDate(18);
                getBoxes('18');
                showCalendarDetail();
              }}
            >
              18
              {boxNums.map((boxNum) => {
                if (boxNum.date === 18) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </MiniContainerEight>
            <MiniContainerNine>
              <BoxNineteen
                onClick={() => {
                  setBoxDate(19);
                  getBoxes('19');
                  showCalendarDetail();
                }}
              >
                19
                {boxNums.map((boxNum) => {
                  if (boxNum.date === 19) {
                    return (
                      <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                    );
                  }
                })}
              </BoxNineteen>
              <BoxTwentyFive
                onClick={() => {
                  setBoxDate(25);
                  getBoxes('25');
                  showCalendarDetail();
                }}
              >
                25
                {boxNums.map((boxNum) => {
                  if (boxNum.date === 25) {
                    return (
                      <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                    );
                  }
                })}
              </BoxTwentyFive>
            </MiniContainerNine>
            <MiniContainerTen
              onClick={() => {
                setBoxDate(20);
                getBoxes('20');
                showCalendarDetail();
              }}
            >
              20
              {boxNums.map((boxNum) => {
                if (boxNum.date === 20) {
                  return (
                    <BoxNumText key={boxNum.date}>{boxNum.cnt}개</BoxNumText>
                  );
                }
              })}
            </MiniContainerTen>
          </MiniContainerSix>
        </CalendarRightContainer>
      </CalendarPageContainer>
      <div className="snowflake">❅</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
    </CalendarBackground>
  );
}
