/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUser, isLogIn, selectUserId } from '../../store/store';

const EventSource = EventSourcePolyfill;
export const Test = () => {
  const LOCAL = 'http://localhost:8080';
  const TOKEN = localStorage.getItem('jwt') || '';
  const ID = useRecoilValue(selectUserId);
  const [userState, setUserState] = useRecoilState(currentUser);

  useEffect(() => {
    console.log(TOKEN);
    const eventSource = new EventSource(LOCAL + 'noti/sub/' + ID, {
      headers: {
        Authorization: TOKEN,
      },
    });
    eventSource.onopen = (event) => console.log('open', event); // <2>
    getNotiList(TOKEN);
    eventSource.onerror = (event) => {
      console.log('error', event);
    };

    eventSource.onmessage = function (event) {
      console.log(event.data, '온메시지');
    };
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
      .get(LOCAL + 'noti/list/' + ID, {
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
