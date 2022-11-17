import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './calendar.css';
import './modalAnimation.scss';
import { CalendarDetail } from '../calendar/calendarDetail/index';
import { BoxCreate } from './boxCreate';
import { API_BASE_URL } from '../../apis/url';
// Recoil
import { selectUserNickname } from '../../store/store';
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
import { useParams } from 'react-router-dom';

export function OtherCalendarModal(props: any) {
  const params = useParams();
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const BASE_URL = API_BASE_URL;
  const [useId, setUerId] = useState<number>(0);
  const [userNickName, setUserNickName] = useState<string>('');
  useEffect(() => {
    // 현재 url 가져오기
    const url = window.location.href;
    console.log(BASE_URL + 'user/deatil/' + params.id);
    axios
      .get(BASE_URL + 'user/detail/' + params.id, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data, '다른 유저 정보');
        setUerId(res.data.id);
        setUserNickName(res.data.nickName);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const { onClose } = props;

  const [content, setContent] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [imges, setImges] = useState<[]>([]);
  const [sender, setSender] = useState<string>('');

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

  // boxCreate창 노출 여부
  const [boxCreateOpen, setBoxCreateOpen] = useState<boolean>(false);
  const showBoxCreate = () => {
    setBoxCreateOpen(true);
  };

  return (
    <CalendarBackground>
      <BoxCreate
        setBoxCreateOpen={setBoxCreateOpen}
        boxCreateOpen={boxCreateOpen}
      ></BoxCreate>
      <TopContainer>
        <CalendarTitle>
          {userNickName}님의{' '}
          {
            // 오늘 연도
            new Date().getFullYear()
          }
          년 어드벤트 캘린더
        </CalendarTitle>
        <PresentButton
          onClick={() => {
            showBoxCreate();
          }}
        >
          선물하기💟
        </PresentButton>

        {/* 크리스마스 카운터 */}
        <Countdown
          date={
            // 2022년 12월 25일 00시 00분 00초
            new Date(2022, 11, 25, 0, 0, 0)
          }
          renderer={renderer}
        />
        <CloseButton
          onClick={() => {
            onClose(false);
          }}
        >
          x
        </CloseButton>
      </TopContainer>
      <CalendarPageContainer>
        <div>{content}</div>
        <div>{audioUrl}</div>
        <div>{imges}</div>
        <div>{sender}</div>
        <CalendarLeftContainer>
          <MiniContainerOne>
            {/* 모달 오픈 */}
            <BoxOne
              onClick={() => {
                showCalendarDetail();
              }}
            >
              1
            </BoxOne>
            <BoxTwo>2</BoxTwo>
            <BoxThree>3</BoxThree>
          </MiniContainerOne>
          <MiniContainerTwo>
            <BoxEight>8</BoxEight>
            <MiniContainerTwoRight>
              <MiniContainerTwoTop>
                <BoxNine>9</BoxNine>
                <BoxTen>10</BoxTen>
              </MiniContainerTwoTop>
              <MiniContainerTwoBottom>
                <BoxThirteen>13</BoxThirteen>
                <BoxFourteen>14</BoxFourteen>
                <BoxFifteen>15</BoxFifteen>
              </MiniContainerTwoBottom>
            </MiniContainerTwoRight>
          </MiniContainerTwo>
          <MiniContainerThree>
            <BoxTwentyOne>21</BoxTwentyOne>
            <BoxTwentyTwo>22</BoxTwentyTwo>
            <BoxTwentyThree>23</BoxTwentyThree>
          </MiniContainerThree>
        </CalendarLeftContainer>
        <CalendarMiddleContainer>
          <BoxFour>4</BoxFour>
          <BoxSixteen>16</BoxSixteen>
        </CalendarMiddleContainer>
        <CalendarRightContainer>
          <MiniContainerFour>
            <BoxFive>5</BoxFive>
            <BoxSix>6</BoxSix>
            <BoxSeven>7</BoxSeven>
          </MiniContainerFour>
          <MiniContainerFive>
            <BoxEleven>11</BoxEleven>
            <BoxTwelve>12</BoxTwelve>
          </MiniContainerFive>
          <MiniContainerSix>
            <MiniContainerSeven>
              <BoxSeventeen>17</BoxSeventeen>
              <BoxTwentyFour>24</BoxTwentyFour>
            </MiniContainerSeven>
            <MiniContainerEight>18</MiniContainerEight>
            <MiniContainerNine>
              <BoxNineteen>19</BoxNineteen>
              <BoxTwentyFive>25</BoxTwentyFive>
            </MiniContainerNine>
            <MiniContainerTen>20</MiniContainerTen>
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
