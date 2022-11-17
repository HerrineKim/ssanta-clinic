import React from 'react';
import styles from './FriendModal.module.css';

export default function FriendModal({
  setFriendModalOpen,
  id,
  title,
  content,
  writer,
}: any) {
  // 모달 끄기

  const closeFriendModal = () => {
    setFriendModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeFriendModal}>
        X
      </button>
      <p>모달창입니다.</p>
    </div>
  );
}
