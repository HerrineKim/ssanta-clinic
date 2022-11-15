import React, { useEffect } from 'react';
import axios from 'axios';

export function BoxDetail() {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  // 녹음 테스트
  useEffect(() => {
    // api/calendar/play?boxId=9
    axios
      .get('http://localhost:8080/api/calendar/play?boxId=9', {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return <div></div>;
}
