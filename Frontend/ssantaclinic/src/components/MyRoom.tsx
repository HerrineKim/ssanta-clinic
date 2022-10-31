import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const MyRoom = () => {
  const [tree, setTree] = useState('');
  const [calendar, setCalendar] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080' + '/api/room/', {
        params: {
          userId: 'userId', // 나중에 Token으로 가져오면 될 듯
        },
      })
      .then((res) => {
        console.log(res.data);
        setTree('내 트리');
        setCalendar('내 캘ㄹ;ㄴ더');
      })
      .catch((err) => {
        console.log(err.resonse);
      });
  });
  return (
    <div>
      <h1>마이 룸</h1>
      <div>
        <h2>{tree}</h2>
        <h2>{calendar}</h2>
      </div>
    </div>
  );
};
