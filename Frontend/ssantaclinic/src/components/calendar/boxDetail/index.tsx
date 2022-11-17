import React, { useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../apis/url';

type BoxDetailProps = {
  boxId: number;
};
export function BoxDetail(props: BoxDetailProps) {
  const BASE_URL = API_BASE_URL;
  const ACCESS_TOKEN = localStorage.getItem('jwt');
  // 녹음 테스트

  return <div></div>;
}
