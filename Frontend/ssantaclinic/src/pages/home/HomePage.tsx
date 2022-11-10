import React, { useState, useEffect } from 'react';
// import { useCanvas } from '../../hooks/useCanvas';
import { Div, ModalDiv } from './styles';
import { MainCanvas } from '../../three/main';
import { Alert } from '../../components/main/alert/index';
import { TreeModal } from '../../components/tree/index';
import { MemoryAlert } from '../../components/main/memoryAlert/Memory';
import { HomeAlert } from '../../components/main/homealert';
import FriendModal from './friendModal/FriendModal';
import {
  FriendButton,
  FriendModalContainer,
  FriendModalTopContainer,
  FriendModalBottomContainer,
  FollowerContainer,
  FollowingContainer,
} from './styles';
import { GiThreeFriends } from 'react-icons/gi';
import axios from 'axios';

export default function Home() {
  // 친구 모달 관리
  const ACCESS_TOKEN = localStorage.getItem('jwt');
  const [friendList, setFriendList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
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
  }, [buttonClicked]);

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

  // 모달창 노출 여부 state
  const [friendModalOpen, setFriendModalOpen] = useState<boolean>(false);

  // const firstCanvas = document.getElementById('main-canvas');
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const canvasCon = document.getElementById('main-canvas');
  // console.log(canvasCon);

  // useCanvas(canvasRef.current);
  // console.log(canvasRef.current);

  //myroom 에서 axios 로 받아오는 트리에 대한 정보
  //트리 위치에 따라 장식품 리스트로 받아옴 => tree는 백에서 glb로 받아오는걸로
  // const data = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 1, 1, 2, 2];

  // 로그인한 유저가 갖고있는 아이템 정보를 받아와야함
  // 개수 정해봐야함 (개수 limit 거는게 맞는 것 같음)
  const items = [1, 2, 3, 1, 1, 2, 3, 1, 2, 3];

  console.log('home');
  useEffect(() => {
    const homeCanvas = new MainCanvas(items);
    // const canvas = document.querySelector('canvas');
    // console.log(canvas);
    // console.log('useeffect');
    const requestId = requestAnimationFrame(homeCanvas.render.bind(homeCanvas));

    return () => {
      cancelAnimationFrame(requestId);
      console.log('canvas 끝!');
    };
  }, []);
  return (
    <Div>
      {/* 모달들 */}
      <div id="open-modal" className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <FriendModalContainer>
            {/* 검색창 */}
            <FriendModalTopContainer></FriendModalTopContainer>
            {/* 팔로워 리스트 */}
            <FriendModalBottomContainer>
              <FollowerContainer>
                <h2>팔로워</h2>
                <ul>
                  {followerList.map((follower: any) => (
                    <li key={follower.userId}>
                      {/* userId와 nickName 출력 */}
                      <ul>{follower.userId}</ul>
                      <ul>{follower.nickName}</ul>
                      <button onClick={() => follow(follower.id)}>
                        팔로우
                      </button>
                    </li>
                  ))}
                </ul>
              </FollowerContainer>
              <FollowingContainer>
                {' '}
                <h2>팔로잉</h2>
                <ul>
                  {followingList.map((following: any) => (
                    <li key={following.userId}>
                      {/* userId와 nickName 출력 */}
                      <ul>{following.userId}</ul>
                      <ul>{following.nickName}</ul>
                      <button onClick={() => follow(following.id)}>
                        팔로우
                      </button>
                    </li>
                  ))}
                </ul>
              </FollowingContainer>
            </FriendModalBottomContainer>
          </FriendModalContainer>
        </div>
      </div>
      <Alert>들어갈래?</Alert>
      <HomeAlert>집으로 들어갈래?</HomeAlert>
      <MemoryAlert></MemoryAlert>
      {/* <TreeModal data={data}></TreeModal> */}
      {/* 버튼들 */}
      <a href="#open-modal">
        <FriendButton>
          {/* <GiThreeFriends /> */}
          친구
        </FriendButton>
      </a>
      {friendModalOpen && <FriendModal />}
      <ModalDiv className="modal"></ModalDiv>
      <Div id="main-canvas"></Div>
    </Div>
  );
}
