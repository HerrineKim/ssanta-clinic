import React, { useEffect, useState } from 'react';
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
import { WriteLetterPage } from './pages/letter/WriteLetterPage';
// import { MyRoomPage } from './pages/myroom/MyRoomPage';
import { ReceiveLetterPage } from './pages/letter/ReceiveLetterPage';
import { ResetTokenPage } from './pages/ResetTokenPage';
// import ShopPage from './pages/shop/ShopPage';
import { NotFound } from './pages/NotFoundPage';
import { OtherRoomPage } from './pages/otherroom/OtherRoomPage';
import { LogInToHomePage } from './pages/logintohome/LogInToHomePage';
import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { currentUser, isLogIn, selectUserId } from './store/store';
import { INoti, notiState } from './store/Notification';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { API_BASE_URL } from './apis/url';
const EventSource = EventSourcePolyfill;

function App() {
  const BASE_URL = API_BASE_URL;
  const TOKEN = localStorage.getItem('jwt') || '';
  const ID = useRecoilValue(selectUserId);
  const setNotis = useSetRecoilState(notiState);
  const [test, setTest] = useState<any[]>([]);
  useEffect(() => {
    if (TOKEN) {
      console.log('sse');
      const eventSource = new EventSource(BASE_URL + '/api/noti/sub/' + ID, {
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
        const data: any = JSON.parse(event.data);
        setNotis((names) => [...names, data]);
      };
    }
  });

  function getNotiList(TOKEN: any) {
    console.log('비동기 안되냐');
    axios
      .get(BASE_URL + '/api/noti/list/' + ID, {
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
        {/* <Route path="/shop" element={<ShopPage />}></Route> */}
        {/* 회원관련 */}
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/findPassword" element={<FindPasswordPage />}></Route>
        <Route
          path="/changePassword/:UUID"
          element={<ChangePasswordPage />}
        ></Route>
        {/* <Route path="/wits" element={<WitsPage />}></Route> */}
        {/* <Route path="/memory" element={<MemoryPage />}></Route> */}
        {/* <Route path="/boxCreate" element={<BoxCreate />}></Route> */}
        {/* <Route path="/letter/write" element={<WriteLetterPage />}></Route> */}
        {/* <Route path="/myroom/:id" element={<MyRoomPage />}></Route> */}
        <Route path="/otherroom/:id" element={<OtherRoomPage />}></Route>
        {/* <Route path="/letter/receive" element={<ReceiveLetterPage />}></Route> */}
        {/* 여기 리시브 뒤에 편지 아이디 시용예정 */}
        <Route path="/tetris" element={<TetrisPage />}></Route>
        <Route path="/resetToken" element={<ResetTokenPage />}></Route>
        <Route path={'*'} element={<NotFound />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="/boxDetail" element={<BoxDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
