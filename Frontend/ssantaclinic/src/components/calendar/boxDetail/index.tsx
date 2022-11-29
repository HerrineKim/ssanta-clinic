import React, { useState, useEffect } from 'react';

import {
  BoxDetailContainer,
  CloseButton,
  BoxDetailTop,
  BoxDetailMiddle,
  BoxDetailBottom,
  SenderText,
  ContentText,
  PlayButton,
  ImageButton,
  ButtonsDiv,
  AudioPlayer,
} from './styles';
import { PictureModal } from '../pictureModal/index';
import { API_BASE_URL } from '../../../apis/url';
import axios from 'axios';

type BoxDetailProps = {
  setBoxDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boxDetailOpen: boolean;
  boxDetail: any;
  boxId: number;
};

export function BoxDetail(props: BoxDetailProps) {
  useEffect(() => {
    if (props) {
      console.log(props.boxDetail);
    }
  }, [props.boxDetail]);

  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const BASE_URL = API_BASE_URL;

  // 오디오 재생(calendar/play?boxId=${props.boxId})
  // const playAudio = () => {
  //   axios
  //     .get(BASE_URL + `calendar/play?boxId=${props.boxId}`, {
  //       headers: {
  //         Authorization: ACCESS_TOKEN,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const closeBoxDetailModal = () => {
    props.setBoxDetailOpen(false);
  };

  // 사진 모달
  const [pictureModalOpen, setPictureModalOpen] = useState(false);
  const openPictureModal = () => {
    setPictureModalOpen(true);
  };

  // 오디오 객체(props.boxDetail.audioUrl)
  // audio가
  // const audio = new Audio(props.boxDetail.audioUrl);

  if (!props.boxDetailOpen) {
    return null;
  } else {
    return (
      <BoxDetailContainer>
        <PictureModal
          pictureModalOpen={pictureModalOpen}
          images={props.boxDetail.imges}
          setPictureModalOpen={setPictureModalOpen}
        ></PictureModal>
        <BoxDetailTop>
          <CloseButton onClick={closeBoxDetailModal}>x</CloseButton>
        </BoxDetailTop>
        <BoxDetailMiddle>
          <ButtonsDiv>
            <ImageButton onClick={openPictureModal}>🖼️</ImageButton>
            {/* 오디오 재생 */}
            <AudioPlayer controls>
              <source src={props.boxDetail.audioUrl} type="audio/mpeg" />
            </AudioPlayer>
          </ButtonsDiv>
          <ContentText>{props.boxDetail.content}</ContentText>
        </BoxDetailMiddle>
        <BoxDetailBottom>
          <SenderText>From. {props.boxDetail.sender}</SenderText>
        </BoxDetailBottom>
      </BoxDetailContainer>
    );
  }
}
