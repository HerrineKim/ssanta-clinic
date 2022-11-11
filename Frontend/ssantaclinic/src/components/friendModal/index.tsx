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
} from './styles';

function FriendModal(props: any) {
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
                  <FollowNickName>{follower.nickName}</FollowNickName>
                </FollowListContainer>
              ))}
            </FollowerContainer>
            <FollowingContainer>
              <FollowingText>팔로잉</FollowingText>
              {followingList.map((following: any) => (
                <FollowListContainer key={following.userId}>
                  <FollowNickName>{following.nickName}</FollowNickName>
                </FollowListContainer>
              ))}
            </FollowingContainer>
          </FriendModalBottomContainer>
        </FriendModalContainer>
      </section>
    </div>
  );
}

export default FriendModal;
