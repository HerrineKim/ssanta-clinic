import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currentUser } from '../store/store';
import { useRecoilState, useResetRecoilState } from 'recoil';

export const ResetTokenPage = () => {
  const reset = useResetRecoilState(currentUser);
  useEffect(() => {
    localStorage.setItem('jwt', '');
  });
  return (
    <div>
      <button onClick={reset}>reset</button>
    </div>
  );
};
