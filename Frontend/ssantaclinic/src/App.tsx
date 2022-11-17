import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BoxDetail } from './components/calendar/boxDetail';
import { SignUpPage } from './pages/auth/SignUpPage';
import { LogInPage } from './pages/auth/LogInPage';
import HomePage from './pages/home/HomePage';
// import TetrisPage from './pages/game/tetris/TetrisPage';
// import WitsPage from './pages/game/WitsPage';
// import MemoryPage from './pages/game/MemoryPage';
import FindPasswordPage from './pages/auth/FindPasswordPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';

// import { MyRoomPage } from './pages/myroom/MyRoomPage';

import { ResetTokenPage } from './pages/ResetTokenPage';
// import ShopPage from './pages/shop/ShopPage';
import { NotFound } from './pages/NotFoundPage';
import { OtherRoomPage } from './pages/otherroom/OtherRoomPage';

function App() {
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
        {/* <Route path="/tetris" element={<TetrisPage />}></Route> */}
        <Route path="/resetToken" element={<ResetTokenPage />}></Route>
        <Route path={'*'} element={<NotFound />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
