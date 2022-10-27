import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/users/SignUp';
import { LogIn } from './pages/users/LogIn';
import { Home } from './pages/Home';
import WitsPage from './pages/game/WitsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/wits" element={<WitsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
