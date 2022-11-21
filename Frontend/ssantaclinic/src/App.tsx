import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignUpPage } from './pages/auth/SignUpPage';
import { LogInPage } from './pages/auth/LogInPage';
import { LogInToHomePage } from './pages/logintohome/LogInToHomePage';
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
import { selectUserIsLogin } from './store/store';
import { useRecoilValue } from 'recoil';
import ProtectedRoute from './ProtectedRoute';

function App() {
  // console.log('APP');
  const isLoggedIn = useRecoilValue(selectUserIsLogin);
  // console.log(isLoggedIn);

  console.log = function no_console() {};
  console.warn = function no_console() {};

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              outlet={<HomePage />}
              isAuthentication={isLoggedIn}
              redirectPath="/login"
            />
          }
        ></Route>
        {/* 회원관련 */}
        <Route
          path="/signup"
          element={
            <ProtectedRoute
              outlet={<SignUpPage />}
              isAuthentication={!isLoggedIn}
              redirectPath="/"
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute
              outlet={<LogInPage />}
              isAuthentication={!isLoggedIn}
              redirectPath="/"
            />
          }
        ></Route>
        <Route
          path="/findPassword"
          element={
            <ProtectedRoute
              outlet={<FindPasswordPage />}
              isAuthentication={!isLoggedIn}
              redirectPath="/"
            />
          }
        ></Route>
        <Route
          path="/changePassword/:UUID"
          element={
            <ProtectedRoute
              outlet={<ChangePasswordPage />}
              isAuthentication={!isLoggedIn}
              redirectPath="/"
            />
          }
        ></Route>
        <Route
          path="/otherroom/:id"
          element={
            <ProtectedRoute
              outlet={<OtherRoomPage />}
              isAuthentication={isLoggedIn}
              redirectPath="/login"
            />
          }
        ></Route>
        {/* <Route path="/letter/receive" element={<ReceiveLetterPage />}></Route> */}
        {/* 여기 리시브 뒤에 편지 아이디 시용예정 */}
        {/* <Route path="/tetris" element={<TetrisPage />}></Route> */}
        <Route path="/logintohome" element={<LogInToHomePage />}></Route>
        <Route path="/resetToken" element={<ResetTokenPage />}></Route>
        <Route path={'*'} element={<NotFound />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
