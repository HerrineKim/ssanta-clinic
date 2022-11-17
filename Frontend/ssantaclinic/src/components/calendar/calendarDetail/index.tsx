import React from 'react';
import {
  CalendarDetailContainer,
  CalendarDetailTopContainer,
  CalendarDetailBottomContainer,
  CloseButton,
  DayDiv,
} from './styles';
// import { Present } from '../present/index';
import { Present2 } from '../present/index2';

type CalendarDetailProps = {
  setCalendarDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  calendarDetailOpen: boolean;
};

export function CalendarDetail(props: CalendarDetailProps) {
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
        {/* <Present></Present> */}
        <Present2></Present2>
        <Present2></Present2>
        <Present2></Present2>
        <Present2></Present2>
        <Present2></Present2>
        <Present2></Present2>
        <Present2></Present2>
        <Present2></Present2>
        <Present2></Present2>
        <Present2></Present2>
      </CalendarDetailBottomContainer>
    </CalendarDetailContainer>
  );
}
