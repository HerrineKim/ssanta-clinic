import React from 'react';
import styles from './index.module.css';

function FriendModal(props: any) {
  const [isModal, setIsModal] = [props.isModal, props.setIsModal];

  function onClickClose() {
    setIsModal(false);
  }

  return (
    <div className={isModal ? styles['modal'] : styles['close']}>
      <section>
        <header>
          <div>Create a Room</div>
          <button onClick={onClickClose}>X</button>
        </header>
      </section>
    </div>
  );
}

export default FriendModal;
