import React, { useState, useEffect, useRef } from 'react';
// import { useCanvas } from '../../hooks/useCanvas';
import { CoinImg, Div, ModalDiv, ShopDiv } from './styles';
import { MainCanvas } from '../../three/main';
import { Alert } from '../../components/main/alert/index';
// import { TreeModal } from '../../components/tree/index';
import { MemoryAlert } from '../../components/main/memoryAlert/Memory';
import { WitAlert } from '../../components/main/witalert/Wit';
import { TetrisAlert } from '../../components/main/tetrisalert/TetrisAlert';
import { HomeAlert } from '../../components/main/homealert';
import { LetterAlert } from '../../components/main/letter/LetterAlert';
import axios from 'axios';
import { FriendButton, MoneyState, ItemButton, BottomBar } from './styles';
// 친구 모달
import FriendModal from '../../components/friendModal/index';
import Loading from '../../components/loading/Loading';
import { SSantaApi } from '../../apis/ssantaApi';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apis/url';
//recoil
import { selectUserId, Money, Items, IsCover } from '../../store/store';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

// import { CalendarAlert } from '../../components/room/calendaralert/Calendar';

export default function Home() {
  const BASE_URL = API_BASE_URL;
  // 친구 모달 관리
  const ACCESS_TOKEN = `${localStorage.getItem('jwt')}`;
  console.log(ACCESS_TOKEN);
  const userId = parseInt(useRecoilValue(selectUserId));
  const [friendList, setFriendList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const setUserMoney = useSetRecoilState(Money);
  const money = useRecoilValue(Money);

  const setUserItems = useSetRecoilState(Items);
  const item = useRecoilValue(Items);

  const setIsCover = useSetRecoilState(IsCover);
  const isCover = useRecoilValue(IsCover);

  const navigate = useNavigate();

  // money 정보 불러오기
  // useEffect(() => {
  //   SSantaApi.getInstance().money(
  //     { userId: userId },
  //     {
  //       onSuccess(data) {
  //         console.log(data);
  //         setUserMoney({ money: data.money });
  //         console.log(money);
  //       },
  //       navigate,
  //     },
  //   );
  // }, []);
  useEffect(() => {
    console.log('랜더링 될때마다:', money);
  });
  const getCoin = () =>
    axios({
      url: `${BASE_URL}coin`,
      method: 'get',
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    }).then((res) => {
      setUserMoney(res.data.coin);
      console.log(res);
    });

  //items 정보불러오기
  useEffect(() => {
    SSantaApi.getInstance().items(
      { userId: userId },
      {
        onSuccess(data) {
          console.log(data);
          setUserItems({ items: data.items });
        },
        navigate,
      },
    );
  }, []);

  const [isLetter, setIsLetter] = useState<boolean>(false);
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
    getCoin();
  }, []);

  // 친구 검색: 추후 구현

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
    const homeCanvas = new MainCanvas(items, userId);
    // const canvas = document.querySelector('canvas');
    // console.log(canvas);
    // console.log('useeffect');
    const requestId = requestAnimationFrame(homeCanvas.render.bind(homeCanvas));

    return () => {
      cancelAnimationFrame(requestId);
      console.log('canvas 끝!');
    };
  }, []);

  // const alert = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   console.log('alert.current:', alert.current);
  // });

  return (
    <Div>
      {/* 모달들 */}
      {/* 친구 모달 */}
      <Alert>들어갈래?</Alert>
      <HomeAlert>집으로 들어갈래?</HomeAlert>
      <TetrisAlert></TetrisAlert>
      <WitAlert></WitAlert>
      <MemoryAlert></MemoryAlert>
      <LetterAlert></LetterAlert>
      {/* <TreeModal data={data}></TreeModal> */}
      {/* 버튼들 */}

      {isCover ? (
        <MoneyState>
          <CoinImg src="img/coin.png"></CoinImg>
          {money}
        </MoneyState>
      ) : null}
      {isCover ? (
        <BottomBar>
          <ItemButton>아이템</ItemButton>
          <FriendButton
            onClick={() => {
              setIsModal(true);
            }}
          >
            {/* <GiThreeFriends /> */}
            친구
          </FriendButton>
        </BottomBar>
      ) : null}

      <FriendModal
        isModal={isModal}
        setIsModal={setIsModal}
        friendList={friendList}
        followingList={followingList}
        followerList={followerList}
      ></FriendModal>
      <ModalDiv className="modal"></ModalDiv>
      <Loading></Loading>
      <ShopDiv id="shop"></ShopDiv>
      <Div id="main-canvas"></Div>
    </Div>
  );
}
