import React, { useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../apis/url';
export function BoxDetail() {
  const BASE_URL = API_BASE_URL;
  const ACCESS_TOKEN = localStorage.getItem('jwt');
  // 녹음 테스트
  useEffect(() => {
    // api/calendar/play?boxId=9
    axios
      .get(BASE_URL + '/api/calendar/play?boxId=11', {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(ACCESS_TOKEN);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(ACCESS_TOKEN);

        console.log(err.response);
      });
  }, []);

  return <div></div>;
}
