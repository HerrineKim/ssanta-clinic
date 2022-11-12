import React from 'react';
import { Div } from './style';
import { useRecoilValue } from 'recoil';
import { selectUserId } from '../../../store/store';
import { Link } from 'react-router-dom';

// interface Iprops {
//   return;
// }

export function HomeAlert(props: any) {
  const Id = useRecoilValue(selectUserId);
  const userId = '1';
  const url = '/myroom/' + userId;
  console.log(url);
  return (
    <Div className="home">
      집으로 들어갈래?
      <Link to={url}>
        <button>ㅇㅇ</button>
      </Link>
    </Div>
  );
}
