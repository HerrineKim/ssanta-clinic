import React from 'react';
import { CalendarDetailContainer } from './styles';
import { CloseButton, PresentContainer } from './styles';
import { Present } from '../present/index';
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
      <CloseButton onClick={closeModal}>닫기</CloseButton>
      <PresentContainer>
        <Present></Present>
        <Present2></Present2>
      </PresentContainer>
    </CalendarDetailContainer>
  );
}
