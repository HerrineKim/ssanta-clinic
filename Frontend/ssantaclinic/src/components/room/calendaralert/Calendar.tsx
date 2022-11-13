import React, { useState } from 'react';
import { Div } from './style';

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
      <Div className="calendar">
        캘린더 구경할래?
        <button onClick={help}>ㅇㅋ</button>
      </Div>
    );
  } else {
    return <CalendarModal onClose={setisHelp}></CalendarModal>;
  }
}
