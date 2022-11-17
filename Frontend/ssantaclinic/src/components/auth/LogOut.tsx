import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogOut = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (confirm('정말 로그아웃 하시겠습니까')) {
      localStorage.setItem('jwt', '');
      navigate('/');
    } else {
      navigate('/');
    }
  };
  return (
    <div id="logout-container">
      <div id="logout">
        <button type="submit" className="logoutButton" onClick={onClickHandler}>
          로그아웃
        </button>
      </div>
    </div>
  );
};
