import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/users/SignUpPage';
import { LogIn } from './pages/users/LogInPage';
import { Home } from './pages/Home';
import WitsPage from './pages/game/WitsPage';
import { FindPassword } from './pages/users/FindPasswordPage';
import { ChangePassword } from './pages/users/ChangePasswordPage';
import { CalendarPage } from './pages/calendar/calendarPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/wits" element={<WitsPage />}></Route>
        <Route path="/findpassword" element={<FindPassword />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
