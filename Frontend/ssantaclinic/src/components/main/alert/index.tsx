import React from 'react';
import { Div } from './style';

import { Link } from 'react-router-dom';

// interface Iprops {
//   return;
// }

export function Alert(props: any) {
  return (
    <Div className="alert">
      들어갈래?
      <Link to="/shop">
        <button>ㅇㅇ</button>
      </Link>
    </Div>
  );
}
