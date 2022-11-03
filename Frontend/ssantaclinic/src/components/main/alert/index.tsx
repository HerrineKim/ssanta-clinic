import React from 'react';
import { Div } from './style';
import axios from 'axios';

import { Link } from 'react-router-dom';

// interface Iprops {
//   return;
// }

export function Alert(props: any) {
  //   function readTextFile(file: string) {
  //     const rawFile = new XMLHttpRequest();
  //     rawFile.open('GET', file, false);
  //     rawFile.onreadystatechange = function () {
  //       if (rawFile.readyState === 4) {
  //         if (rawFile.status === 200 || rawFile.status == 0) {
  //           const allText = rawFile.responseText;
  //           alert(allText);
  //         }
  //       }
  //     };
  //     rawFile.send(null);
  //   }

  return (
    <Div className="alert">
      들어갈래?
      <button>ㅇㅇ</button>
    </Div>
  );
}
