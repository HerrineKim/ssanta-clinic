import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './calendar.css';
import './modalAnimation.scss';
import { CalendarDetail } from '../calendar/calendarDetail/index';
import { BoxCreate } from './boxCreate';

// Recoil
import { selectUserNickname } from '../../store/store';
import { selectUserId } from '../../store/store';
import { useRecoilValue } from 'recoil';

import Countdown from 'react-countdown';
import { TopContainer, PresentButton } from './styles';
import { CalendarBackground } from './styles';
import { CalendarPageContainer } from './styles';
import { CalendarLeftContainer } from './styles';
// 좌측 상단
import { CalendarTitle, CloseButton } from './styles';
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
  const { onClose } = props;
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const nickName = useRecoilValue(selectUserNickname);
  const userId = useRecoilValue(selectUserId);

  const [content, setContent] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [imges, setImges] = useState<[]>([]);
  const [sender, setSender] = useState<string>('');

  // 캘린더 날짜 별 개수 가져오기(api/calendar/userId=int)
  const [boxNums, setBoxNums] = useState<any[]>([]);
  // [{"date":1,"cnt":0},{"date":2,"cnt":1},{"date":3,"cnt":0}]
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/calendar?userId=${userId}`, {
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
    // axios
    // .get(`http://localhost:8080/api/calendar/use`, {
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

  const getBoxInfo = () => {
    axios
      .get('http://localhost:8080/api/calendar?boxId=3', {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
        setContent(res.data.content);
        setAudioUrl(res.data.audioUrl);
        setImges(res.data.imges);
        setSender(res.data.sender);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // 일별 모달창 노출 여부
  const [calendarDetailOpen, setCalendarDetailOpen] = useState<boolean>(false);
  const showCalendarDetail = () => {
    setCalendarDetailOpen(true);
  };

  // boxCreate창 노출 여부
  const [boxCreateOpen, setBoxCreateOpen] = useState<boolean>(false);
  const showBoxCreate = () => {
    setBoxCreateOpen(true);
  };

  return (
    <CalendarBackground>
      <CalendarDetail
        setCalendarDetailOpen={setCalendarDetailOpen}
        calendarDetailOpen={calendarDetailOpen}
      ></CalendarDetail>
      <BoxCreate
        setBoxCreateOpen={setBoxCreateOpen}
        boxCreateOpen={boxCreateOpen}
      ></BoxCreate>
      <TopContainer>
        <CalendarTitle>
          {nickName}님의{' '}
          {
            // 오늘 연도
            new Date().getFullYear()
          }
          년 어드벤트 캘린더
        </CalendarTitle>

        {/* 크리스마스 카운터 */}
        <Countdown
          date={
            // 2022년 12월 25일 00시 00분 00초
            new Date(2022, 11, 25, 0, 0, 0)
          }
          renderer={renderer}
        />
        <CloseButton
          className="outbtn"
          onClick={() => {
            onClose(false);
          }}
        >
          x
        </CloseButton>
      </TopContainer>
      <CalendarPageContainer>
        <CalendarLeftContainer>
          <MiniContainerOne>
            {/* 모달 오픈 */}
            <BoxOne
              onClick={() => {
                showCalendarDetail();
              }}
            >
              1
              {boxNums.map((boxNum) => {
                if (boxNum.date === 1) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxOne>
            <BoxTwo>
              2
              {boxNums.map((boxNum) => {
                if (boxNum.date === 2) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxTwo>
            <BoxThree>
              3
              {boxNums.map((boxNum) => {
                if (boxNum.date === 3) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxThree>
          </MiniContainerOne>
          <MiniContainerTwo>
            <BoxEight>
              8
              {boxNums.map((boxNum) => {
                if (boxNum.date === 8) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxEight>
            <MiniContainerTwoRight>
              <MiniContainerTwoTop>
                <BoxNine>
                  9
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 9) {
                      return <p key={boxNum.date}>{boxNum.cnt}</p>;
                    }
                  })}
                </BoxNine>
                <BoxTen>
                  10
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 10) {
                      return <p key={boxNum.date}>{boxNum.cnt}</p>;
                    }
                  })}
                </BoxTen>
              </MiniContainerTwoTop>
              <MiniContainerTwoBottom>
                <BoxThirteen>
                  13
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 13) {
                      return <p key={boxNum.date}>{boxNum.cnt}</p>;
                    }
                  })}
                </BoxThirteen>
                <BoxFourteen>
                  14
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 14) {
                      return <p key={boxNum.date}>{boxNum.cnt}</p>;
                    }
                  })}
                </BoxFourteen>
                <BoxFifteen>
                  15
                  {boxNums.map((boxNum) => {
                    if (boxNum.date === 15) {
                      return <p key={boxNum.date}>{boxNum.cnt}</p>;
                    }
                  })}
                </BoxFifteen>
              </MiniContainerTwoBottom>
            </MiniContainerTwoRight>
          </MiniContainerTwo>
          <MiniContainerThree>
            <BoxTwentyOne>
              21
              {boxNums.map((boxNum) => {
                if (boxNum.date === 21) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxTwentyOne>
            <BoxTwentyTwo>
              22
              {boxNums.map((boxNum) => {
                if (boxNum.date === 22) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxTwentyTwo>
            <BoxTwentyThree>
              23
              {boxNums.map((boxNum) => {
                if (boxNum.date === 23) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxTwentyThree>
          </MiniContainerThree>
        </CalendarLeftContainer>
        <CalendarMiddleContainer>
          <BoxFour>
            4
            {boxNums.map((boxNum) => {
              if (boxNum.date === 4) {
                return <p key={boxNum.date}>{boxNum.cnt}</p>;
              }
            })}
          </BoxFour>
          <BoxSixteen>
            16
            {boxNums.map((boxNum) => {
              if (boxNum.date === 16) {
                return <p key={boxNum.date}>{boxNum.cnt}</p>;
              }
            })}
          </BoxSixteen>
        </CalendarMiddleContainer>
        <CalendarRightContainer>
          <MiniContainerFour>
            <BoxFive>
              5
              {boxNums.map((boxNum) => {
                if (boxNum.date === 5) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxFive>
            <BoxSix>
              6
              {boxNums.map((boxNum) => {
                if (boxNum.date === 6) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxSix>
            <BoxSeven>
              7
              {boxNums.map((boxNum) => {
                if (boxNum.date === 7) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxSeven>
          </MiniContainerFour>
          <MiniContainerFive>
            <BoxEleven>
              11
              {boxNums.map((boxNum) => {
                if (boxNum.date === 11) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxEleven>
            <BoxTwelve>
              12
              {boxNums.map((boxNum) => {
                if (boxNum.date === 12) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </BoxTwelve>
          </MiniContainerFive>
          <MiniContainerSix>
            <MiniContainerSeven>
              <BoxSeventeen>
                17
                {boxNums.map((boxNum) => {
                  if (boxNum.date === 17) {
                    return <p key={boxNum.date}>{boxNum.cnt}</p>;
                  }
                })}
              </BoxSeventeen>
              <BoxTwentyFour>
                24
                {boxNums.map((boxNum) => {
                  if (boxNum.date === 24) {
                    return <p key={boxNum.date}>{boxNum.cnt}</p>;
                  }
                })}
              </BoxTwentyFour>
            </MiniContainerSeven>
            <MiniContainerEight>
              18
              {boxNums.map((boxNum) => {
                if (boxNum.date === 18) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
                }
              })}
            </MiniContainerEight>
            <MiniContainerNine>
              <BoxNineteen>
                19
                {boxNums.map((boxNum) => {
                  if (boxNum.date === 19) {
                    return <p key={boxNum.date}>{boxNum.cnt}</p>;
                  }
                })}
              </BoxNineteen>
              <BoxTwentyFive>
                25
                {boxNums.map((boxNum) => {
                  if (boxNum.date === 25) {
                    return <p key={boxNum.date}>{boxNum.cnt}</p>;
                  }
                })}
              </BoxTwentyFive>
            </MiniContainerNine>
            <MiniContainerTen>
              20
              {boxNums.map((boxNum) => {
                if (boxNum.date === 20) {
                  return <p key={boxNum.date}>{boxNum.cnt}</p>;
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
