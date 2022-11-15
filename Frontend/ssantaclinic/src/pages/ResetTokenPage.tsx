import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currentUser } from '../store/store';
import { useSetRecoilState, useResetRecoilState } from 'recoil';

export const ResetTokenPage = () => {
  const setUser = useSetRecoilState(currentUser);
  useEffect(() => {
    localStorage.clear();
  });
  function Reset() {
    setUser({
      email: '',
      id: '',
      nickname: '',
      noti: [],
      isLogin: false,
    });
  }
  return (
    <div>
      <button onClick={Reset}>reset</button>
    </div>
  );
};
