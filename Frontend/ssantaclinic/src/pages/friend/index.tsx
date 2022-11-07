import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FriendContainer,
  FriendList,
  FriendSearch,
  Following,
  Follower,
  FollowButton,
} from './styles';

export const FriendPage = () => {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  const [friendList, setFriendList] = React.useState([]);
  const [followingList, setFollowingList] = React.useState([]);
  const [followerList, setFollowerList] = React.useState([]);
  const [searchList, setSearchList] = React.useState([]);
  useEffect(() => {
    // 추천 친구 목록 불러오기(api/friend/recommend)
    const getFriendList = () => {
      axios
        .get('http://localhost:8080/api/friend/recommend', {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        })
        .then((res) => {
          console.log(res.data);
          setFriendList(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    // 팔로잉 목록(api/friend/followings)
    const getFollowingList = () => {
      axios
        .get('http://localhost:8080/api/friend/followings', {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        })
        .then((res) => {
          console.log(res.data);
          setFollowingList(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    // 팔로워 목록(api/friend/followers)
    const getFollowerList = () => {
      axios
        .get('http://localhost:8080/api/friend/followers', {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        })
        .then((res) => {
          console.log(res.data);
          setFollowerList(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getFriendList();
    getFollowingList();
    getFollowerList();
  }, []);

  // 팔로우 & 언팔로우(/api/friend/follow)
  const follow = (friendId: number) => {
    axios
      .post(
        'http://localhost:8080/api/friend/follow',
        {
          friendId: friendId,
        },
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        // setIsFollowed(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // 친구 검색: 추후 구현

  return (
    <div>
      <FriendContainer>
        {/* 친구 검색 */}
        <FriendSearch>
          <input type="text" placeholder="친구 검색" />
          <button>검색</button>
        </FriendSearch>
        {/* 추천 친구 목록 */}
        <FriendList>
          <div>
            <img src="https://placeimg.com/100/100/any" alt="profile" />
            <div>
              <div>이름</div>
              <div>소개</div>
            </div>
            {/* if follow == 1: '팔로잉', if follow == 0: '팔로우' */}
            {/* setIsFollowed */}
            <FollowButton onClick={() => follow(1)}>팔로우</FollowButton>
          </div>
          <div>
            <img src="https://placeimg.com/100/100/any" alt="profile" />
            <div>
              <div>이름</div>
              <div>소개</div>
            </div>
            <FollowButton>팔로우</FollowButton>
          </div>
          <div>
            <img src="https://placeimg.com/100/100/any" alt="profile" />
            <div>
              <div>이름</div>
              <div>소개</div>
            </div>
            <FollowButton>팔로우</FollowButton>
          </div>
        </FriendList>
        {/* 팔로잉 */}
        <Following>
          <div>팔로잉</div>
          <div>
            <img src="https://placeimg.com/100/100/any" alt="profile" />
            <div>
              <div>이름</div>
              <div>소개</div>
            </div>
            <FollowButton>팔로우</FollowButton>
          </div>
          <div>
            <img src="https://placeimg.com/100/100/any" alt="profile" />
            <div>
              <div>이름</div>
              <div>소개</div>
            </div>
            <FollowButton>팔로우</FollowButton>
          </div>
          <div>
            <img src="https://placeimg.com/100/100/any" alt="profile" />
            <div>
              <div>이름</div>
              <div>소개</div>
            </div>
            <FollowButton>팔로우</FollowButton>
          </div>
        </Following>
        {/* 팔로워 */}
        <Follower>
          <div>팔로워</div>
          <div>
            <img src="https://placeimg.com/100/100/any" alt="profile" />
            <div>
              <div>이름</div>
              <div>소개</div>
            </div>
            <FollowButton>팔로우</FollowButton>
          </div>
        </Follower>
      </FriendContainer>
    </div>
  );
};
