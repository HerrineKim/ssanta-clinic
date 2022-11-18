import React, { useEffect } from 'react';
import axios from 'axios';
import { OtherRoomContainer } from './styled';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../apis/url';
const TOKEN = localStorage.getItem('jwt') || '';

export const OtherRoom = () => {
  const BASE_URL = API_BASE_URL;
  const param = useParams();
  const OtherID = param.id;
  useEffect(() => {
    axios
      .get(BASE_URL + 'user/detail/' + OtherID, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  });
  return <OtherRoomContainer></OtherRoomContainer>;
};
