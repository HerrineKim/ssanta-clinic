import React, { useState } from 'react';
import { HomeAlertDiv, InButton } from './style';
import { useRecoilValue } from 'recoil';
import { selectUserId } from '../../../store/store';

// import { Link } from 'react-router-dom';
import RoomModal from '../../room/RoomModal';

// interface Iprops {
//   return;
// }

export function HomeAlert(props: any) {
  const Id = useRecoilValue(selectUserId);

  const [isHelp, setisHelp] = useState<boolean>(false);
  function help() {
    setisHelp(true);
  }

  if (!isHelp) {
    return (
      <HomeAlertDiv className="home">
        들어갈래?
        <InButton onClick={help}>네!</InButton>
      </HomeAlertDiv>
    );
  } else {
    return <RoomModal onClose={setisHelp}></RoomModal>;
  }
}
