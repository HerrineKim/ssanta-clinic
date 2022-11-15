import React, { useState } from 'react';
import { CalendarAlertDiv, CalendarButton } from './style';

import { CalendarModal } from '../../calendar/CalendarModal';

// interface Iprops {
//   return;
// }

export function CalendarAlert(props: any) {
  const [isHelp, setisHelp] = useState<boolean>(false);
  function help() {
    setisHelp(true);
  }

  if (!isHelp) {
    return (
      <CalendarAlertDiv className="calendar">
        선물이 많이 왔을까?
        <CalendarButton onClick={help}>구경</CalendarButton>
      </CalendarAlertDiv>
    );
  } else {
    return <CalendarModal onClose={setisHelp}></CalendarModal>;
  }
}
