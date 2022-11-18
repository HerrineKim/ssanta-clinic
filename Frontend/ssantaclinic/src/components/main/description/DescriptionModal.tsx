import React from 'react';
import styles from './index.module.css';
import {
  DescriptionModalContainer,
  DescriptionModalCloseButton,
  SmallTitle,
  DescriptionContainer,
  Text,
  DescriptionImg,
  DescriptionGameImg,
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
          <h1 id="title">산타 클리닉</h1>

          <p id="title-description">
            산타 클리닉에 오신걸 환영합니다! 아래 설명을 참고해서 이용해보세요!
          </p>

          <DescriptionContainer>
            <SmallTitle>편지</SmallTitle>
            <DescriptionImg src="ArchitectureImg/letter/letter.png" />
            <Text>Santa Letter라고 쓰인 건물을 클릭하세요!</Text>
            <DescriptionImg src="ArchitectureImg/letter/send_letter.png" />
            <DescriptionImg src="ArchitectureImg/letter/receive_letter.png" />
            <Text>
              싼타에게 고민 종류와 편지를 작성해서 보내면 응원의 메세지를
              보내줄거예요!
            </Text>
            <SmallTitle>미니게임</SmallTitle>
            <div id="game-image">
              <DescriptionGameImg src="ArchitectureImg/game/Tetris.png"></DescriptionGameImg>
              <DescriptionGameImg
                id="speed"
                src="ArchitectureImg/game/Speed.png"
              ></DescriptionGameImg>
              <DescriptionGameImg src="ArchitectureImg/game/Find.png"></DescriptionGameImg>
            </div>
            <Text>테트리스, 반응속도, 그림찾기 게임을 할 수 있습니다!</Text>
            <Text>게임을 통해서 코인을 획득하세요!</Text>
            <SmallTitle>상점</SmallTitle>
            <Text>
              게임을 통해 얻은 코인으로 상점에서 획득한 코인으로 트리에 꾸밀
              장식품을 살수 있습니다!
            </Text>
            <DescriptionImg src="ArchitectureImg/store/Store.png"></DescriptionImg>
            <DescriptionImg src="ArchitectureImg/store/store_inside.png"></DescriptionImg>
            <Text>
              게임을 통해 얻은 코인으로 상점에서 획득한 코인으로 트리에 꾸밀
              장식품을 살수 있습니다!
            </Text>
            <SmallTitle>마이룸</SmallTitle>
            <DescriptionImg src="ArchitectureImg/room/MyRoom.png"></DescriptionImg>
            <DescriptionImg src="ArchitectureImg/room/room_inside_description.jpg"></DescriptionImg>
            <Text>
              내 방으로 가서 어드벤트 캘린더를 확인하고 트리를 꾸며보세요!
            </Text>
            <DescriptionImg src="ArchitectureImg/room/calendar_inside.png"></DescriptionImg>
            <DescriptionImg src="ArchitectureImg/room/MyRoom_tree.png"></DescriptionImg>
            <Text>
              내 방 캘린더에서는 친구에게 받은 선물을 확인할 수 있습니다.
            </Text>
            <Text>
              또한 마우스 휠을 통해 트리 전면을 3D 장식품으로 꾸밀 수 있습니다.
            </Text>
            <SmallTitle>친구</SmallTitle>
            <DescriptionImg src="ArchitectureImg/friend/plus.png"></DescriptionImg>
            <DescriptionImg src="ArchitectureImg/friend/friend.png"></DescriptionImg>
            <Text>
              홈 페이지 오른쪽 아래의 친구를 클릭하여 친구의 닉네임을 검색 후
              엔터를 누르면 친구의 방으로 갈 수 있습니다
            </Text>
            <DescriptionImg src="ArchitectureImg/friend/friend_calendar.png"></DescriptionImg>
            <Text>
              선물이 도착했으면 하는 날짜를 클릭한 뒤에 음성, 이미지, 편지
              선물을 보낼 수 있습니다! 선물은 12월 해당 날짜에 도착하게 됩니다.
            </Text>
            <Text>
              친구에게 응원의 메시지, 함께한 사진, 기프티콘 등을 보내
              선물해보세요!
            </Text>
          </DescriptionContainer>

          {/* <MyRoomDescriptionContainer>
              <SmallTitle>어드벤트 캘린더</SmallTitle>
              <p>친구와 선물을 주고 받아보세요!</p>
              <SmallTitle>트리 꾸미기</SmallTitle>
              <p>나만의 트리를 꾸며보세요!</p>
            </MyRoomDescriptionContainer> */}
          {/* <GameDescriptionContainer>
              <SmallTitle>미니게임</SmallTitle>
              <p>미니게임을 통해서 코인을 얻고 트리를 꾸며보세요!</p>
            </GameDescriptionContainer> */}
        </DescriptionModalContainer>
      </section>
    </div>
  );
}
