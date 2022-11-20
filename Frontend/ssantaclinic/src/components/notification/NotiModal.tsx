import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { NotiModalContainer, NotiModalCloseButton } from './styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectUserId } from '../../store/store';
import { notiState } from '../../store/Notification';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/url';

export default function NotiModal(props: any) {
  const BASE_URL = API_BASE_URL;
  const ACCESS_TOKEN = localStorage.getItem('jwt') || '';
  const [notis, setNotis] = useRecoilState(notiState);
  const [isModal, setIsModal] = [props.isModal, props.setIsModal];
  const ID = useRecoilValue(selectUserId);
  useEffect(() => {
    axios
      .patch(BASE_URL + 'noti/read/' + ID, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      // .then((res) => {
      //   const =
      // })
      .catch((err) => {
        console.log(err.resonse);
      });
  });
  function Notis({ noti }: { noti: any }) {
    return (
      <div
        // whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.9 }}
        id="noti"
        // onClick={() => {
        //   onLetterId(letter.replyLetterid);
        //   onReceiveLetter(true);
        //   onLetterList(false);
        // }}
      >
        {noti.type === 'GIFT' && (
          <b className="noti-message">
            {noti.message} 방의 캘린더를 확인해보세요!
          </b>
        )}
        {noti.type === 'REPLY' && (
          <b className="noti-message">
            산타의 {noti.message} 편지함을 확인해보세요!
          </b>
        )}
      </div>
    );
  }
  function onClickClose() {
    setIsModal(false);
  }

  return (
    <div className={isModal ? styles['modal'] : styles['close']}>
      <section>
        <NotiModalCloseButton type="button" onClick={onClickClose}>
          X
        </NotiModalCloseButton>
        <NotiModalContainer>
          {notis.map((noti: any, index: any) => (
            <Notis noti={noti} key={index} />
          ))}
        </NotiModalContainer>
      </section>
    </div>
  );
}
