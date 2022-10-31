import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignUpPage } from './pages/users/SignUpPage/SignUpPage';
import { LogInPage } from './pages/users/LoginPage/LogInPage';
import HomePage from './pages/HomePage';

import WitsPage from './pages/game/WitsPage';
import MemoryPage from './pages/game/MemoryPage';
import { CalendarPage } from './pages/calendar/calendarPage';
import { BoxCreate } from './pages/calendar/boxCreate';
import FindPasswordPage from './pages/users/FindPasswordPage/FindPasswordPage';
import ChangePasswordPage from './pages/users/ChangePasswordPage/ChangePasswordPage';
import { WriteLetterPage } from './pages/letter/WriteLetterPage';
import { MyRoomPage } from './pages/MyRoomPage';
import { ReceiveLetterPage } from './pages/letter/ReceiveLetterPage';
import NotificationPage from './pages/NotificationPage';

function App() {
  console.log('APP');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/wits" element={<WitsPage />}></Route>
        <Route path="/memory" element={<MemoryPage />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
        <Route path="/boxCreate" element={<BoxCreate />}></Route>
        <Route path="/findpassword" element={<FindPasswordPage />}></Route>
        <Route path="/changepassword" element={<ChangePasswordPage />}></Route>
        <Route path="/letter/write" element={<WriteLetterPage />}></Route>
        <Route path="/room" element={<MyRoomPage />}></Route>
        {/* 여기 룸 뒤에 사용자 아이디 시용예정 */}
        <Route path="/letter/receive" element={<ReceiveLetterPage />}></Route>
        {/* 여기 리시브 뒤에 편지 아이디 시용예정 */}
        <Route path="/notification" element={<NotificationPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
