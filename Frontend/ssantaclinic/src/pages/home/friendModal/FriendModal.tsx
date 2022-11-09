import React, { useEffect } from 'react';
// import { FriendModalContainer, FriendModalInnerBox } from './styles';
import './styles.scss';
import axios from 'axios';

export default function FriendModal() {
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
    <div id="open-modal" className="modal-window">
      <div>
        <a href="#" title="Close" className="modal-close">
          Close
        </a>
        <h1>Voilà!</h1>
        <div>
          A CSS-only modal based on the :target pseudo-class. Hope you find it
          helpful.
        </div>
        <div>
          <small>Check out 👇</small>
        </div>
      </div>
    </div>
  );
}
