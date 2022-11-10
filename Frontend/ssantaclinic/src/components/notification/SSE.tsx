/* eslint-disable no-undef */
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import React, { useEffect } from 'react';
// const EventSource = NativeEventSource || EventSourcePolyfill;
const LOCAL = 'http://localhost:8080';
const TOKEN = localStorage.getItem('jwt') || '';

export const Test = () => {
  useEffect(() => {
    let eventSource: any;
    const fetchSse = async () => {
      try {
        eventSource = new EventSourcePolyfill(LOCAL + '/api/noti/sub', {
          headers: {
            Authorization: TOKEN,
          },
        });

        /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
        eventSource.onmessage = async (event: any) => {
          const res = await event.data;
          console.log(res);
        };

        /* EVENTSOURCE ONERROR ------------------------------------------------------ */
        eventSource.onerror = async (event: any) => {
          console.log(event);
        };
      } catch (error) {
        console.log(error);
      }
    };
    fetchSse();
    return () => eventSource.close();
  });
  return (
    <div>
      <h1>test</h1>
    </div>
  );
};
