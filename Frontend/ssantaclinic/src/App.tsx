import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/users/SignUp';
import { LogIn } from './pages/users/LogIn';
import { Home } from './pages/Home';
import { FindPassword } from './pages/users/FindPassword';
import { ChangePassword } from './pages/users/ChangePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/findpassword" element={<FindPassword />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
