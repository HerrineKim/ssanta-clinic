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

type CalendarDetailProps = {
  setCalendarDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  calendarDetailOpen: boolean;
  date: number;
  Boxes: any;
};

export function CalendarDetail(props: CalendarDetailProps) {
  // 해당 날짜 상자 목록 조회(/api/calendar?date=string)

  const closeModal = () => {
    props.setCalendarDetailOpen(false);
  };
  if (!props.calendarDetailOpen) {
    return null;
  }
  return (
    <CalendarDetailContainer>
      <CalendarDetailTopContainer>
        <DayDiv>12월 1일</DayDiv>
        <CloseButton onClick={closeModal}>X</CloseButton>
      </CalendarDetailTopContainer>
      <CalendarDetailBottomContainer>
        {/* 박스 개수 만큼 present2 출력 */}
        {props.Boxes.map((box: any) => (
          <Present2 key={box.boxId} box={box} />
        ))}
      </CalendarDetailBottomContainer>
    </CalendarDetailContainer>
  );
}
