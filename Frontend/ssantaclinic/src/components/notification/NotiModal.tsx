import React, { useState } from 'react';
import styles from './index.module.css';
import { FriendModalContainer, FriendModalCloseButton } from './styles';
import { useRecoilState } from 'recoil';
import { notiState } from '../../store/Notification';

export default function NotiModal(props: any) {
  const [notis, setNotis] = useRecoilState(notiState);
  const [isModal, setIsModal] = [props.isModal, props.setIsModal];
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
        <b>{noti.message}</b>
      </div>
    );
  }
  function onClickClose() {
    setIsModal(false);
  }

  return (
    <div className={isModal ? styles['modal'] : styles['close']}>
      <section>
        <FriendModalContainer>
          <FriendModalCloseButton type="button" onClick={onClickClose}>
            X
          </FriendModalCloseButton>
          {notis.map((noti: any, index: any) => (
            <Notis noti={noti} key={index} />
          ))}
        </FriendModalContainer>
      </section>
    </div>
  );
}
