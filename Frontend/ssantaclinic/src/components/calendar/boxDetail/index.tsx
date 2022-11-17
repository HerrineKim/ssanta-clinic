import React, { Fragment, useEffect } from 'react';
import { BoxDetailContainer } from './styles';
import { API_BASE_URL } from '../../../apis/url';
import axios from 'axios';

type BoxDetailProps = {
  setBoxDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boxDetailOpen: boolean;
  boxDetail: any;
  boxId: number;
};

export function BoxDetail(props: BoxDetailProps) {
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const BASE_URL = API_BASE_URL;

  // 오디오 재생(calendar/play?boxId=${props.boxId})
  const playAudio = () => {
    axios
      .get(BASE_URL + `calendar/play?boxId=${props.boxId}`, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeBoxDetailModal = () => {
    props.setBoxDetailOpen(false);
  };
  if (!props.boxDetailOpen) {
    return null;
  } else {
    return (
      <BoxDetailContainer>
        <button onClick={closeBoxDetailModal}>x</button>
        <div>{props.boxDetail.content}</div>
        {/* <div>{props.boxDetail.d}</div> */}
        {/* audioUrl 재생 */}
        <button
          onClick={() => {
            playAudio();
          }}
        >
          재생
        </button>
        <div>{props.boxDetail.sender}</div>
      </BoxDetailContainer>
    );
  }
}
