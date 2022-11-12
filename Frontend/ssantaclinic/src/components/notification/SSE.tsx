/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import React, { useEffect } from 'react';
import axios from 'axios';
// const EventSource = NativeEventSource || EventSourcePolyfill;
const LOCAL = 'http://localhost:8080';
const TOKEN = localStorage.getItem('jwt') || '';

export const Test = () => {
  useEffect(() => {
    console.log(TOKEN);
    if (TOKEN !== '') {
      let eventSource: any;
      eventSource = new EventSourcePolyfill(LOCAL + '/api/noti/sub', {
        headers: {
          Authorization: TOKEN,
        },
      });
      getNotiList(TOKEN);
      console.log(eventSource.readyState);
      console.log(eventSource.url);
      console.log(eventSource.readyState);
      console.log('여기;');
      /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
      eventSource.onmessage = async (event: any) => {
        const res = await event.data;
        console.log(res);
      };
      console.log('여기2');
      /* EVENTSOURCE ONERROR ------------------------------------------------------ */
      eventSource.onerror = async (event: any) => {
        console.log(event);
      };
      console.log('여기3');
      console.log(eventSource.readyState);
    }
  });

  async function getNotiList(TOKEN: any) {
    console.log('비동기 안되냐');
    await axios
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
