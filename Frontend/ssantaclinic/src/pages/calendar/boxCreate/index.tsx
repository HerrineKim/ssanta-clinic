import React, { useCallback, useState } from 'react';
import axios from 'axios';

// https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
declare const window: any;

export function BoxCreate() {
  // 음성 녹음 기능
  const [stream, setStream] = useState<any>();
  const [media, setMedia] = useState<any>();
  const [onRec, setOnRec] = useState<boolean>(true);
  const [source, setSource] = useState<any>();
  const [analyser, setAnalyser] = useState<any>();
  const [audioUrl, setAudioUrl] = useState<any>();

  const onRecAudio = () => {
    // 음원 정보를 담은 노드를 생성하거나 음원을 실행 또는 디코딩
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    // Javascript를 통해 음원의 진행상태에 직접 접근한다.
    const analyser = audioContext.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream: any) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여 줌
      const source = audioContext.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    }

    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e: any) {
        // 1분(60초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 60) {
          stream.getAudioTracks().forEach((track: any) => track.stop());
          mediaRecorder.stop();
          // 메서드가 호출된 노드 연결 해제
          analyser.disconnect();
          audioContext.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e: any) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e: any) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach((track: any) => track.stop());

    // 미디어 캡쳐 중지
    media.stop();
    // 메서드가 호출된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], 'soundBlob', {
      lastModified: new Date().getTime(),
      type: 'audio',
    });
    console.log(sound); // File 정보 출력
  }, [audioUrl]);

  // 녹음 파일 다운로드
  const downloadAudioFile = useCallback(() => {
    if (audioUrl) {
      const url = URL.createObjectURL(audioUrl);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = 'soundBlob';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [audioUrl]);

  return (
    <div>
      <h1>BoxCreate</h1>
      <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
      <button onClick={onSubmitAudioFile}>결과 확인</button>
      {/* 다운로드 */}
      <button onClick={downloadAudioFile}>다운로드</button>
    </div>
  );
}
