import React from 'react';
import { Div } from './style';
import { useRecoilValue } from 'recoil';
import { selectUserId } from '../../../store/store';
import { Link } from 'react-router-dom';

// interface Iprops {
//   return;
// }

export function HomeAlert(props: any) {
  const userId = useRecoilValue(selectUserId);
  return (
    <Div className="home">
      집으로 들어갈래?
      <Link to="/room/:userId">
        <button>ㅇㅇ</button>
      </Link>
    </Div>
  );
}
