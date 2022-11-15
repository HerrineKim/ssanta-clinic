import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignUpPage } from './pages/auth/SignUpPage';
import { LogInPage } from './pages/auth/LogInPage';
import { LogOutPage } from './pages/auth/LogOutPage';
import HomePage from './pages/home/HomePage';
import TetrisPage from './pages/game/tetris/TetrisPage';
// import WitsPage from './pages/game/WitsPage';
// import MemoryPage from './pages/game/MemoryPage';
import { CalendarPage } from './pages/calendar/calendarPage';
import { BoxCreate } from './pages/calendar/boxCreate';
import FindPasswordPage from './pages/auth/FindPasswordPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import { WriteLetterPage } from './pages/letter/WriteLetterPage';
// import { MyRoomPage } from './pages/myroom/MyRoomPage';
import { ReceiveLetterPage } from './pages/letter/ReceiveLetterPage';
import NotificationPage from './pages/NotificationPage';
import { ResetTokenPage } from './pages/ResetTokenPage';
// import ShopPage from './pages/shop/ShopPage';
import { NotFound } from './pages/NotFoundPage';
import { OtherRoomPage } from './pages/otherroom/OtherRoomPage';
import { LogInToHomePage } from './pages/logintohome/LogInToHomePage';
import { Test } from './components/notification/SSE';
import { AniTestPage } from './pages/logintohome/AniTest';
function App() {
  console.log('APP');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* <Route path="/shop" element={<ShopPage />}></Route> */}
        {/* 회원관련 */}
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/logintohome" element={<LogInToHomePage />}></Route>
        <Route path="/logout" element={<LogOutPage />}></Route>
        <Route path="/findPassword" element={<FindPasswordPage />}></Route>
        <Route
          path="/changePassword/:UUID"
          element={<ChangePasswordPage />}
        ></Route>
        {/* <Route path="/wits" element={<WitsPage />}></Route> */}
        {/* <Route path="/memory" element={<MemoryPage />}></Route> */}
        <Route path="/calendar" element={<CalendarPage />}></Route>
        <Route path="/boxCreate" element={<BoxCreate />}></Route>
        <Route path="/letter/write" element={<WriteLetterPage />}></Route>
        {/* <Route path="/myroom/:id" element={<MyRoomPage />}></Route> */}
        <Route path="/otherroom/:id" element={<OtherRoomPage />}></Route>
        <Route path="/letter/receive" element={<ReceiveLetterPage />}></Route>
        {/* 여기 리시브 뒤에 편지 아이디 시용예정 */}
        <Route path="/notification" element={<NotificationPage />}></Route>
        <Route path="/tetris" element={<TetrisPage />}></Route>
        <Route path="/resettoken" element={<ResetTokenPage />}></Route>
        <Route path={'*'} element={<NotFound />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/anitest" element={<AniTestPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
