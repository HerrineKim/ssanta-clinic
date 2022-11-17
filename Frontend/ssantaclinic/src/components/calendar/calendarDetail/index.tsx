import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CalendarDetailContainer,
  CalendarDetailTopContainer,
  CalendarDetailBottomContainer,
  CloseButton,
  DayDiv,
} from './styles';
import { Present2 } from '../present/index2';
import { BoxDetail } from '../boxDetail/index';
import { API_BASE_URL } from '../../../apis/url';

type CalendarDetailProps = {
  setCalendarDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  calendarDetailOpen: boolean;
  date: number;
  Boxes: any;
};

export function CalendarDetail(props: CalendarDetailProps) {
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const BASE_URL = API_BASE_URL;

  // boxDetail 모달 설정
  const [boxDetailOpen, setBoxDetailOpen] = useState<boolean>(false);
  const [boxDetail, setBoxDetail] = useState<any>(null);
  const [boxId, setBoxId] = useState<number>(1);

  // boxDetail 값 읽어오기
  const getBoxDetail = (boxId: number) => {
    axios
      .get(BASE_URL + `calendar?boxId=${boxId}`, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        setBoxDetail(res.data);
        setBoxId(boxId);

        console.log(res.data);
      })
      // 비동기 처리 성공!
      .then(() => {
        setBoxDetailOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    props.setCalendarDetailOpen(false);
  };
  if (!props.calendarDetailOpen) {
    return null;
  } else if (!props.Boxes) {
    return (
      <CalendarDetailContainer>
        <CalendarDetailTopContainer>
          <CloseButton onClick={closeModal}>X</CloseButton>
          <DayDiv>{props.date}일</DayDiv>
        </CalendarDetailTopContainer>
        <CalendarDetailBottomContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
              color: 'white',
              fontFamily: 'Cafe24Ssurround',
              width: '100%',
            }}
          >
            상자가 없습니다.
          </div>
        </CalendarDetailBottomContainer>
      </CalendarDetailContainer>
    );
  } else {
    return (
      <CalendarDetailContainer>
        {/* box 개수 만큼 box detail 모달 숨겨 놓기 */}
        <BoxDetail
          setBoxDetailOpen={setBoxDetailOpen}
          boxDetailOpen={boxDetailOpen}
          boxDetail={boxDetail}
          boxId={boxId}
        ></BoxDetail>
        <CalendarDetailTopContainer>
          <DayDiv>
            12월 {props.date < 10 ? `0${props.date}` : props.date}일
          </DayDiv>
          <CloseButton onClick={closeModal}>X</CloseButton>
        </CalendarDetailTopContainer>
        <CalendarDetailBottomContainer>
          {/* 박스 개수 만큼 present2 출력 */}
          {props.Boxes.map((box: any) => (
            <div
              onClick={() => {
                getBoxDetail(box.boxId);
              }}
              key={box.boxId}
            >
              <Present2
              // boxDetail에 props로 box 정보 전달
              ></Present2>
            </div>
          ))}
        </CalendarDetailBottomContainer>
      </CalendarDetailContainer>
    );
  }
}
