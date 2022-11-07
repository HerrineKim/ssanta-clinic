import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
// import { Input } from '../notification/NotiInput';
// import { NotiListState } from '../../store/store';
// import { useRecoilState } from 'recoil';
import { NotiContainer } from './styled';

export const Notification = () => {
  const [isNotification, setIsNotification] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(0);
  // const [notiList, setNotiList] = useRecoilState(NotiListState);
  const testNoti: any = [
    '임완택님이 선물 보냈어요!',
    '싼타가 답장을 보냈어요!',
    '어드벤트 캘린더를 확인하세요!',
  ];
  useEffect(() => {
    // setNotiList(testNoti);
    axios
      .get('http://localhost:8080' + '/api/noti', {})
      .then((res) => {
        console.log(res.data);
        // notiList.set('Lokesh', 37); 반복문으로 안 읽은 알람 data 배열에 넣기
        // notiList.set('Raj', 35);
        // notiList.set('John', 40);
      })
      .catch((err) => {
        console.log(err.response);
      });
  });

  function notification() {
    console.log(isNotification);
    if (isNotification === false) {
      setScale(0);
      setIsNotification(!isNotification);
    } else {
      setScale(1);
      setIsNotification(!isNotification);
    }
  }
  return (
    <NotiContainer>
      <button onClick={notification}>알림 화면</button>
      <div className="example">
        <div>
          <motion.div className="box" animate={{ scale }}>
            {testNoti.map(
              (noti: string, index: number): string => `${index}: ${noti}`,
            )}
          </motion.div>
        </div>
      </div>
    </NotiContainer>
  );
};
