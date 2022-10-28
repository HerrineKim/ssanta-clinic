import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/users/SignUpPage';
import { LogIn } from './pages/users/LogInPage';
import { Home } from './pages/Home';
import WitsPage from './pages/game/WitsPage';
import MemoryPage from './pages/game/MemoryPage';
import { FindPassword } from './pages/users/FindPasswordPage';
import { ChangePassword } from './pages/users/ChangePasswordPage';
import { Letter } from './pages/letter/LetterPage';
import { CalendarPage } from './pages/calendar/calendarPage';
import { BoxCreate } from './pages/calendar/boxCreate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/wits" element={<WitsPage />}></Route>
        <Route path="/memory" element={<MemoryPage />}></Route>
        <Route path="/findPassword" element={<FindPassword />}></Route>
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/letter" element={<Letter />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
        <Route path="/boxCreate" element={<BoxCreate />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
