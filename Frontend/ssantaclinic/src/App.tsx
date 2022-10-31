import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/users/SignUpPage';
import { LogIn } from './pages/users/LogInPage';
import Home from './pages/home/Home';
import WitsPage from './pages/game/WitsPage';
import MemoryPage from './pages/game/MemoryPage';
import { FindPassword } from './pages/users/FindPasswordPage';
import { ChangePassword } from './pages/users/ChangePasswordPage';
import { Letter } from './pages/letter/LetterPage';

function App() {
  console.log('APP');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/wits" element={<WitsPage />}></Route>
        <Route path="/memory" element={<MemoryPage />}></Route>
        <Route path="/findpassword" element={<FindPassword />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/letter" element={<Letter />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
