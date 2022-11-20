import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ReactMediaRecorder } from 'react-media-recorder';
import {
  BoxCreateContainer,
  MessageContainer,
  RecordContainer,
  RecordText,
  RecordPlayer,
  RecordStatus,
  RecordButtonContainer,
  ImageContainer,
  BoxCreateTop,
  BoxCreateMiddle,
  BoxCreateBottom,
  CloseButton,
  XButton,
  DayText,
  DayInput,
  DaySenderContainer,
  SenderText,
  SenderInput,
  ContentTextarea,
  ImageText,
  ImageUploader,
  RecordStartButton,
  RecordStopButton,
  RecordSaveButton,
  SuccessDiv,
} from './styles';

import { API_BASE_URL } from '../../../apis/url';

// console.log(ACCESS_TOKEN);

type BoxCreateProps = {
  setBoxCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boxCreateOpen: boolean;
};

export function BoxCreate(props: BoxCreateProps) {
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const BASE_URL = API_BASE_URL;
  // 상자 보내기 (/api/calendar)
  const [audio, setAudio] = useState<File>();
  const [image, setImage] = useState<File[]>([]);
  const [sender, setSender] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [receiver, setReceiver] = useState<string>('');
  const [dayBox, setDayBox] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // 자동으로 현재 날짜 및 시간 yyyy-mm-dd hh:mm:ss 형태로 가져오기
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    // 만약에 month, day, hour, minute, second가 한 자리 수라면 앞에 0을 붙인다
    const monthString = month < 10 ? `0${month}` : month;
    const dayString = day < 10 ? `0${day}` : day;
    const hourString = hour < 10 ? `0${hour}` : hour;
    const minuteString = minute < 10 ? `0${minute}` : minute;
    const secondString = second < 10 ? `0${second}` : second;
    const dateString = `${year}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}`;
    setCreatedAt(dateString);
    // 쿼리 스트링에서 receiverId 가져오기
    const url = window.location.href;
    // otherroom/숫자
    const receiver = url.split('/')[4];
    setReceiver(receiver);
    console.log(receiver);
  }, []);

  const sendBox = (e: any) => {
    e.preventDefault();
    // boxRequest를 json 형태로 담아 준다.
    const boxRequest = {
      content: content,
      sender: sender,
      createdAt: createdAt,
      day: dayBox,
      receiverId: receiver,
    };
    // formData를 생성한다.
    // https://stackoverflow.uestions/55101841/argument-of-type-file-is-not-assignable-to-parameter-of-type-string-blob-i
    const boxFormData: any = new FormData();
    // boxRequest를 formData에 담는다.
    const boxBlob = new Blob([JSON.stringify(boxRequest)], {
      type: 'application/json',
    });
    boxFormData.append('boxRequest', boxBlob);
    // audio가 있으면 formData에 담는다.
    if (audio) {
      boxFormData.append('audio', audio);
    }
    // image가 있으면 formData에 담는다.
    if (image) {
      boxFormData.append('imges', image);
    }
    // config
    const config = {
      method: 'post',
      url: BASE_URL + 'calendar',
      headers: {
        Authorization: ACCESS_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
      data: boxFormData,
      params: {
        userId: receiver,
        day: dayBox,
      },
    };

    axios({
      method: 'post',
      url: BASE_URL + 'calendar',
      headers: {
        Authorization: ACCESS_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
      data: boxFormData,
      params: {
        userId: receiver,
        day: dayBox,
      },
    })
      .then((res) => {
        console.log(res);
        console.log(config);
        // 모달 닫기
        setIsSuccess(true);
        setTimeout(() => {
          props.setBoxCreateOpen(false);
          setIsSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      });
  };
  const setIsOpen = () => {
    props.setBoxCreateOpen(false);
  };
  if (!props.boxCreateOpen) {
    return null;
  }
  return (
    <Fragment>
      <BoxCreateContainer>
        <BoxCreateTop>
          <DaySenderContainer>
            <DayText>받는 날짜:</DayText>
            {/* day */}
            <DayInput
              type="number"
              placeholder="날짜"
              onChange={(e) => setDayBox(Number(e.target.value))}
              // 1~25일까지만 입력 가능
              min="1"
              max="25"
              // 1일부터 시작
              defaultValue="1"
            />
            <SenderText>보내는 이:</SenderText>
            {/* sender 닉네임 */}
            <SenderInput
              type="text"
              placeholder="여섯 자 이내"
              onChange={(e) => setSender(e.target.value)}
            />
          </DaySenderContainer>
          {/* 닫기 버튼 */}
          <XButton onClick={setIsOpen}>x</XButton>
        </BoxCreateTop>
        <BoxCreateMiddle>
          <RecordContainer>
            <RecordText>음성 메시지 보내기 📼</RecordText>
            <ReactMediaRecorder
              audio
              render={({
                status,
                startRecording,
                stopRecording,
                mediaBlobUrl,
              }) => (
                <Fragment>
                  <RecordPlayer>
                    <audio src={mediaBlobUrl} controls />
                  </RecordPlayer>
                  <RecordStatus>
                    {' '}
                    {status
                      // 정규식으로 idle -> 녹음 대기중, recording -> 녹음 중, stopped -> 녹음 중지로 바꾸기
                      // aquiring_media -> 녹음 권한 허용
                      .replace(/idle/g, '녹음 대기중')
                      .replace(/recording/g, '~녹음 중~')
                      .replace(/stopped/g, '녹음 중지')
                      .replace(/acquiring_media/g, '녹음 권한 허용')}
                  </RecordStatus>
                  <RecordButtonContainer>
                    <RecordStartButton onClick={startRecording}>
                      ⏺️
                    </RecordStartButton>
                    <RecordStopButton onClick={stopRecording}>
                      ⏹️
                    </RecordStopButton>
                    {/* 내가 보내려는 음성을 저장 */}
                    <RecordSaveButton
                      onClick={() => {
                        // Url을 File로 변환하여 저장

                        if (mediaBlobUrl) {
                          fetch(mediaBlobUrl)
                            .then((res) => res.blob())
                            .then((blob) => {
                              const file = new File(
                                [blob],
                                'audio_message.wav',
                                {
                                  type: 'audio_message/wav',
                                },
                              );
                              setAudio(file);
                            })
                            .then(() => {
                              console.log(audio);
                            });
                        }
                      }}
                    >
                      담기
                    </RecordSaveButton>
                  </RecordButtonContainer>
                </Fragment>
              )}
            />
          </RecordContainer>

          <ImageContainer>
            <ImageText>사진 보내기 🖼️</ImageText>
            {/* image upload */}
            <ImageUploader>
              <div className="image-upload">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setImage(Array.from(e.target.files));
                    }
                  }}
                />
              </div>
            </ImageUploader>
          </ImageContainer>
          <MessageContainer>
            {/* content */}
            <ContentTextarea
              placeholder="마음을 담은 메시지를 남겨주세요."
              onChange={(e) => setContent(e.target.value)}
            />
          </MessageContainer>
        </BoxCreateMiddle>
        <BoxCreateBottom>
          {/* 상자 보내기 */}
          <CloseButton onClick={sendBox}>상자 보내기 🎁</CloseButton>
        </BoxCreateBottom>
      </BoxCreateContainer>
      {isSuccess && <SuccessDiv>보내기 성공!</SuccessDiv>}
    </Fragment>
  );
}
