import React from 'react';
import styles from './index.module.css';
import {
  DescriptionModalContainer,
  DescriptionModalCloseButton,
} from './styles';

export default function DescriptionModal(props: any) {
  const [isModal, setIsModal] = [props.isModal, props.setIsModal];

  function onClickClose() {
    setIsModal(false);
  }

  return (
    <div className={isModal ? styles['modal'] : styles['close']}>
      <section>
        <DescriptionModalCloseButton type="button" onClick={onClickClose}>
          X
        </DescriptionModalCloseButton>
        <DescriptionModalContainer>
          <h1>산타 클리닉</h1>
          <p>
            산타 클리닉에 오신걸 환영합니다! 아래 설명을 참고해서 이용해보세요!
          </p>
          <h2>편지</h2>
          <p>Santa Letter라고 쓰인 건물을 클릭하세요!</p>
          <h2>어드벤트 캘린더</h2>
          <p>친구와 선물을 주고 받아보세요!</p>
          <h2>미니게임</h2>
          <p>미니게임을 통해서 코인을 얻고 트리를 꾸며보세요!</p>
          <h2>트리 꾸미기</h2>
          <p>나만의 트리를 꾸며보세요!</p>
        </DescriptionModalContainer>
      </section>
    </div>
  );
}
