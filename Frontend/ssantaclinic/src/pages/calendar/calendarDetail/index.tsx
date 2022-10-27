import React from 'react';
import { CalendarDetailContainer } from './styles';
import { CloseButton } from './styles';

type CalendarDetailProps = {
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CalendarDetail(props: CalendarDetailProps) {
  const closeModal = () => {
    props.setCalendarOpen(false);
  };
  return (
    <CalendarDetailContainer>
      <CloseButton onClick={closeModal}>닫기</CloseButton>
      <h1>Cdf</h1>
    </CalendarDetailContainer>
  );
}
