import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BoxDetail } from './components/calendar/boxDetail';
import { SignUpPage } from './pages/auth/SignUpPage';
import { LogInPage } from './pages/auth/LogInPage';
import HomePage from './pages/home/HomePage';
import TetrisPage from './pages/game/tetris/TetrisPage';
// import WitsPage from './pages/game/WitsPage';
// import MemoryPage from './pages/game/MemoryPage';
import FindPasswordPage from './pages/auth/FindPasswordPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';

// import { MyRoomPage } from './pages/myroom/MyRoomPage';

import { ResetTokenPage } from './pages/ResetTokenPage';
// import ShopPage from './pages/shop/ShopPage';
import { NotFound } from './pages/NotFoundPage';
import { OtherRoomPage } from './pages/otherroom/OtherRoomPage';

import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { selectUserId } from './store/store';
import { notiState } from './store/Notification';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { API_BASE_URL } from './apis/url';
const EventSource = EventSourcePolyfill;

function App() {
  const BASE_URL = API_BASE_URL;
  const TOKEN = localStorage.getItem('jwt') || '';
  const ID = useRecoilValue(selectUserId);
  const setNotis = useSetRecoilState(notiState);

  useEffect(() => {
    if (TOKEN) {
      console.log('sse');
      const eventSource = new EventSource(BASE_URL + 'noti/sub/' + ID, {
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
        try {
          const data: any = JSON.parse(event.data);
          setNotis((names) => [...names, data]);
        } catch {
          console.log(event, '패스');
        }
      };
    }
  });

  function getNotiList(TOKEN: any) {
    console.log('비동기 안되냐');
    axios
      .get(BASE_URL + 'noti/list/' + ID, {
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
  console.log('APP');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* 회원관련 */}
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/findPassword" element={<FindPasswordPage />}></Route>
        <Route
          path="/changePassword/:UUID"
          element={<ChangePasswordPage />}
        ></Route>
        <Route path="/otherroom/:id" element={<OtherRoomPage />}></Route>
        {/* <Route path="/letter/receive" element={<ReceiveLetterPage />}></Route> */}
        {/* 여기 리시브 뒤에 편지 아이디 시용예정 */}
        <Route path="/tetris" element={<TetrisPage />}></Route>
        <Route path="/resetToken" element={<ResetTokenPage />}></Route>
        <Route path={'*'} element={<NotFound />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
