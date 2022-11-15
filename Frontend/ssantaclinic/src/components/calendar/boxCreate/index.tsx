import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactMediaRecorder } from 'react-media-recorder';
import { selectUserId, selectUserNickname } from '../../../store/store';
import { useRecoilValue } from 'recoil';
import {
  BoxCreateContainer,
  MessageContainer,
  RecordContainer,
  ImageContainer,
  BoxCreateTop,
  BoxCreateMiddle,
  BoxCreateBottom,
  CloseButton,
  XButton,
} from './styles';

const ACCESS_TOKEN = localStorage.getItem('jwt') || '';

type BoxCreateProps = {
  setBoxCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boxCreateOpen: boolean;
};

export function BoxCreate(props: BoxCreateProps) {
  // 상자 보내기 (/api/calendar)
  const [audio, setAudio] = useState<File>();
  const [image, setImage] = useState<File[]>([]);
  const [sender, setSender] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [receiver, setReceiver] = useState<string>('');
  const [day, setDay] = useState<number>(1);
  const userId = useRecoilValue(selectUserId);

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
    const receiverId = url.split('=')[1];
    setReceiver(receiverId);
  }, []);

  const sendBox = (e: any) => {
    e.preventDefault();
    // boxRequest를 json 형태로 담아 준다.
    const boxRequest = {
      content: content,
      sender: sender,
      createdAt: createdAt,
      day: day,
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
      url: 'http://localhost:8080/api/calendar',
      headers: {
        Authorization: ACCESS_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
      data: boxFormData,
      params: {
        userId: userId,
        day: day,
      },
    };
    axios(config)
      .then((res) => {
        console.log(res);
        // 모달 닫기
        props.setBoxCreateOpen(false);
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
    <BoxCreateContainer>
      <BoxCreateTop>
        {/* day */}
        <input
          type="number"
          placeholder="날짜"
          onChange={(e) => setDay(Number(e.target.value))}
        />
        {/* sender 닉네임 */}
        <input
          type="text"
          placeholder="보내는 사람"
          onChange={(e) => setSender(e.target.value)}
        />
        {/* 닫기 버튼 */}
        <XButton onClick={setIsOpen}>x</XButton>
      </BoxCreateTop>
      <BoxCreateMiddle>
        <RecordContainer>
          <ReactMediaRecorder
            audio
            render={({
              status,
              startRecording,
              stopRecording,
              mediaBlobUrl,
            }) => (
              <div>
                <p>
                  {status
                    // 정규식으로 idle -> 녹음 대기중, recording -> 녹음 중, stopped -> 녹음 중지로 바꾸기
                    // aquiring_media -> 녹음 권한 허용
                    .replace(/idle/g, '녹음 대기중')
                    .replace(/recording/g, '~녹음 중~')
                    .replace(/stopped/g, '녹음 중지')
                    .replace(/acquiring_media/g, '녹음 권한 허용')}
                </p>
                <button onClick={startRecording}>녹음 시작</button>
                <button onClick={stopRecording}>녹음 끝</button>
                <video src={mediaBlobUrl} controls autoPlay loop />
                {/* 내가 보내려는 음성을 저장 */}
                <button
                  onClick={() => {
                    // Url을 File로 변환하여 저장
                    if (mediaBlobUrl) {
                      // setAudio
                      fetch(mediaBlobUrl)
                        .then((res) => res.blob())
                        .then((blob) => {
                          const file = new File([blob], 'audio_message.wav', {
                            type: 'audio_message/wav',
                          });
                          setAudio(file);
                        })
                        .then(() => {
                          console.log(audio);
                        });
                    }
                  }}
                >
                  저장
                </button>
                {/* 다운로드 */}
                <a href={mediaBlobUrl} download="my-audio-file.wav">
                  다운로드
                </a>
              </div>
            )}
          />
        </RecordContainer>
        <MessageContainer>
          {/* content */}
          <input
            type="text"
            placeholder="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </MessageContainer>
        <ImageContainer>
          {/* image upload */}
          <div className="image-upload">
            <label htmlFor="image-upload">이미지 업로드</label>
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
        </ImageContainer>
      </BoxCreateMiddle>
      <BoxCreateBottom>
        {/* 상자 보내기 */}
        <CloseButton onClick={sendBox}>상자 보내기</CloseButton>
      </BoxCreateBottom>
    </BoxCreateContainer>
  );
}
