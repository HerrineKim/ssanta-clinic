import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import {
  FriendModalContainer,
  FriendModalBottomContainer,
  FriendModalTopContainer,
  FriendModalCloseButton,
  FriendSearchInput,
  FollowerContainer,
  FollowingContainer,
  FollowerText,
  FollowingText,
  FollowListContainer,
  FollowNickName,
  FollowEmoji,
  PeopleContainer,
} from './styles';

export default function FriendModal(props: any) {
  // 크리스마스 관련 이모지 중 랜덤 이모지 선택
  const christmasEmojiList = [
    '🎄',
    '🎅',
    '🎁',
    '🎉',
    '🎊',
    '🎈',
    '🎏',
    '🎇',
    '🎆',
    '🎐',
    '🎑',
    '🎀',
  ];
  const randomEmoji =
    christmasEmojiList[Math.floor(Math.random() * christmasEmojiList.length)];

  const [isModal, setIsModal] = [props.isModal, props.setIsModal];
  const [friendList, setFriendList] = [props.friendList, props.setFriendList];
  const [followingList, setFollowingList] = [
    props.followingList,
    props.setFollowingList,
  ];
  const [followerList, setFollowerList] = [
    props.followerList,
    props.setFollowerList,
  ];
  const [searchList, setSearchList] = [props.searchList, props.setSearchList];

  function onClickClose() {
    setIsModal(false);
  }

  return (
    <div className={isModal ? styles['modal'] : styles['close']}>
      <section>
        <FriendModalContainer>
          <FriendModalTopContainer>
            <FriendSearchInput
              type="text"
              placeholder="🎅 닉네임으로 친구 찾기"
            />
            <FriendModalCloseButton type="button" onClick={onClickClose}>
              X
            </FriendModalCloseButton>
          </FriendModalTopContainer>
          <FriendModalBottomContainer>
            <FollowerContainer>
              <FollowerText>팔로워</FollowerText>
              {followerList.map((follower: any) => (
                <FollowListContainer key={follower.userId}>
                  <FollowEmoji>
                    {
                      christmasEmojiList[
                        Math.floor(Math.random() * christmasEmojiList.length)
                      ]
                    }
                  </FollowEmoji>
                  <FollowNickName>{follower.nickName}</FollowNickName>
                </FollowListContainer>
              ))}
            </FollowerContainer>
            <FollowingContainer>
              <FollowingText>팔로잉</FollowingText>
              <PeopleContainer>
                {followingList.map((following: any) => (
                  <FollowListContainer key={following.userId}>
                    <FollowEmoji>
                      {
                        christmasEmojiList[
                          Math.floor(Math.random() * christmasEmojiList.length)
                        ]
                      }
                    </FollowEmoji>
                    <FollowNickName>{following.nickName}</FollowNickName>
                  </FollowListContainer>
                ))}
              </PeopleContainer>
            </FollowingContainer>
          </FriendModalBottomContainer>
        </FriendModalContainer>
      </section>
    </div>
  );
}
