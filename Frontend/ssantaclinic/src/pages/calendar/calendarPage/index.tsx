import React from 'react';
import { CalendarPageContainer } from './styles';
import { CalendarPageTitle } from './styles';
import { AdventCalendarBox } from './styles';
import { CalendarDetail } from '../calendarDetail';

export function CalendarPage() {
  // 모달창 노출 여부
  const [calendarOpen, setCalendarOpen] = React.useState<boolean>(false);
  // 모달창 노출
  const showCalendar = () => {
    setCalendarOpen(true);
  };
  return (
    <CalendarPageContainer>
      <CalendarPageTitle>어드벤트 캘린더 페이지</CalendarPageTitle>
      <AdventCalendarBox onClick={showCalendar}>day n</AdventCalendarBox>
      {calendarOpen && <CalendarDetail setCalendarOpen={setCalendarOpen} />}
    </CalendarPageContainer>
  );
}
