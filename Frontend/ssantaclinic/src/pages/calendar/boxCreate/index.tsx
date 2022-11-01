import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { ReactMediaRecorder } from 'react-media-recorder';
// https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
// declare const window: any;
// const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
export function BoxCreate() {
  // 상자 보내기 (/api/calendar)
  const [audio, setAudio] = useState<File>();
  const sendBox = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (audio) {
      formData.append('audio', audio);
    }
    const boxRequest = {
      content: 'content',
      createdAt: '2022-11-01',
      day: 1,
      receiverId: 1, // 받는 사람 아이디
    };
    const blob = new Blob([JSON.stringify(boxRequest)], {
      type: 'application/json',
    });
    formData.append('boxRequest', blob);
    axios
      .post('http://localhost:8080' + '/api/calendar', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcHJpbGtpbTk4QG5hdmVyLmNvbSIsImF1dGgiOiIiLCJleHAiOjE2NjcyOTM0MDh9.xtnddbu6dWYdBVqAeaU6HCnyf-dex9aavcuEqCNrwwBaQ22Z6RUQa8IMzfSAu0M8i2E3A-Oc_udfKbdIvJkdkA',
          'Content-type': 'multipart/form-data',
        },
        data: formData,
      })
      .then((res) => {
        console.log('응답 받아옴 성공!', res.data);
      })
      .catch((err) => {
        // console.log(ACCESS_TOKEN);
        console.log(err.response);
      });
  };
  return (
    <div>
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <video src={mediaBlobUrl} controls autoPlay loop />
            {/* 파일 형태로 저장 */}
            <button
              onClick={() => {
                // Url을 File로 변환하여 저장
                if (mediaBlobUrl) {
                  const file = new File([mediaBlobUrl], 'audio.wav', {
                    type: 'audio/wav',
                  });
                  setAudio(file);
                  console.log(typeof file);
                }
              }}
            >
              저장
            </button>
            {/* 다운로드 */}
            <a href={mediaBlobUrl} download="my-audio-file.mp3">
              Download
            </a>
            {/* 상자 보내기 */}
            <button onClick={sendBox}>상자 보내기</button>
          </div>
        )}
      />
    </div>
  );
}
// // 음성 녹음 기능
// const [stream, setStream] = useState<any>();
// const [media, setMedia] = useState<any>();
// const [onRec, setOnRec] = useState<boolean>(true);
// const [source, setSource] = useState<any>();
// const [analyser, setAnalyser] = useState<any>();
// const [audioUrl, setAudioUrl] = useState<any>();

// const onRecAudio = () => {
//   // 음원 정보를 담은 노드를 생성하거나 음원을 실행 또는 디코딩
//   const audioContext = new (window.AudioContext ||
//     window.webkitAudioContext)();
//   // Javascript를 통해 음원의 진행상태에 직접 접근한다.
//   const analyser = audioContext.createScriptProcessor(0, 1, 1);
//   setAnalyser(analyser);

//   function makeSound(stream: any) {
//     // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여 줌
//     const source = audioContext.createMediaStreamSource(stream);
//     setSource(source);
//     source.connect(analyser);
//     analyser.connect(audioContext.destination);
//   }

//   // 마이크 사용 권한 획득
//   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();
//     setStream(stream);
//     setMedia(mediaRecorder);
//     makeSound(stream);

//     analyser.onaudioprocess = function (e: any) {
//       // 1분(60초) 지나면 자동으로 음성 저장 및 녹음 중지
//       if (e.playbackTime > 60) {
//         stream.getAudioTracks().forEach((track: any) => track.stop());
//         mediaRecorder.stop();
//         // 메서드가 호출된 노드 연결 해제
//         analyser.disconnect();
//         audioContext.createMediaStreamSource(stream).disconnect();

//         mediaRecorder.ondataavailable = function (e: any) {
//           setAudioUrl(e.data);
//           setOnRec(true);
//         };
//       } else {
//         setOnRec(false);
//       }
//     };
//   });
// };

// // 사용자가 음성 녹음을 중지했을 때
// const offRecAudio = () => {
//   // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
//   media.ondataavailable = function (e: any) {
//     setAudioUrl(e.data);
//     setOnRec(true);
//   };

//   // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
//   stream.getAudioTracks().forEach((track: any) => track.stop());

//   // 미디어 캡쳐 중지
//   media.stop();
//   // 메서드가 호출된 노드 연결 해제
//   analyser.disconnect();
//   source.disconnect();
// };

// const onSubmitAudioFile = useCallback(() => {
//   if (audioUrl) {
//     console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
//   }
//   // File 생성자를 사용해 파일로 변환
//   const sound = new File([audioUrl], 'soundBlob', {
//     lastModified: new Date().getTime(),
//     type: 'audio',
//   });
//   console.log(sound); // File 정보 출력
// }, [audioUrl]);

// // 녹음 파일 다운로드
// const downloadAudioFile = useCallback(() => {
//   if (audioUrl) {
//     const url = URL.createObjectURL(audioUrl);
//     const a = document.createElement('a');
//     document.body.appendChild(a);
//     a.style.display = 'none';
//     a.href = url;
//     a.download = 'soundBlob';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   }
// }, [audioUrl]);

//   return (
//     <div>
//       <h1>BoxCreate</h1>
//       <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
//       <button onClick={onSubmitAudioFile}>결과 확인</button>
//       {/* 다운로드 */}
//       <button onClick={downloadAudioFile}>다운로드</button>
//     </div>
//   );
// }
