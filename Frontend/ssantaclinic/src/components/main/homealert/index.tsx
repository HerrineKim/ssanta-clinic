import React, { useState } from 'react';
import { Div } from './style';
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
      <Div className="home">
        들어갈래?
        <button onClick={help}>ㅇㅋ</button>
      </Div>
    );
  } else {
    return <RoomModal onClose={setisHelp}></RoomModal>;
  }
}
