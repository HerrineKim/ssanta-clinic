import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Notification = () => {
  const [notiList, setNotiList] = useState<number[]>([1, 2, 3, 4, 5]);
  useEffect(() => {
    axios
      .get('http://localhost:8080' + '/api/noti', {})
      .then((res) => {
        console.log(res.data);
        // notiList.set('Lokesh', 37); 반복문으로 안 읽은 알람 data 배열에 넣기
        // notiList.set('Raj', 35);
        // notiList.set('John', 40);
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  });
  return (
    <div>
      <h1>알림 확인</h1>
      <div>{notiList}</div>
    </div>
  );
};
