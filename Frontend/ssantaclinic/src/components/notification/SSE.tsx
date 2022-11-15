/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { currentUser, isLogIn } from '../../store/store';

const EventSource = EventSourcePolyfill;
const LOCAL = 'http://localhost:8080';
const TOKEN = localStorage.getItem('jwt') || '';

export const Test = () => {
  const [userState, setUserState] = useRecoilState(currentUser);

  useEffect(() => {
    console.log(TOKEN);
    const eventSource = new EventSource(LOCAL + '/api/noti/sub', {
      headers: {
        Authorization: TOKEN,
      },
    });
    eventSource.onopen = (event) => console.log('open', event); // <2>
    eventSource.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      const data = JSON.parse(event.data);
      setUserState({
        email: 'test',
        id: userState.id,
        nickname: userState.nickname,
        noti: [data],
        isLogin: true,
      });
    };

    eventSource.onerror = (event) => {
      console.log('error', event);
    };
    setTimeout(() => {
      console.log(userState);
    }, 10000);
    // eventSource.onmessage = function (event) {
    //   console.log(event.data, '온메시지');
    // };
    // console.log(eventSource.onmessage);
    // eventSource.addEventListener('onmessage', function (e: any) {
    //   console.log(e.data, 'addevent');
    // });
    // if (TOKEN !== '') {
    //   let eventSource: any;
    //   eventSource = new EventSourcePolyfill(LOCAL + '/api/noti/sub', {
    //     headers: {
    //       Authorization: TOKEN,
    //     },
    //   });
    //   getNotiList(TOKEN);
    //   console.log('여기;');
    //   /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
    //   eventSource.onmessage = async (event: any) => {
    //     const res = await event.data;
    //     console.log(res);
    //   };
    //   console.log('여기2');
    //   /* EVENTSOURCE ONERROR ------------------------------------------------------ */
    //   eventSource.onerror = async (event: any) => {
    //     console.log(event);
    //   };
    //   console.log('여기3');
    //   console.log(eventSource.readyState);
    // }
  });

  function getNotiList(TOKEN: any) {
    console.log('비동기 안되냐');
    axios
      .get(LOCAL + '/api/noti/list', {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        console.log(res, '리스트');
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <div>
      <h1>test</h1>
      <button></button>
    </div>
  );
};
