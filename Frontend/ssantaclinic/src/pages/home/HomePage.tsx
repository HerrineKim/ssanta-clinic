import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import LogoutIcon from '@mui/icons-material/Logout';
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
import {
  FriendButton,
  MoneyState,
  ItemButton,
  BottomBar,
  TopBar,
  LogoutButton,
  NotiButton,
  NotiConTainer,
} from './styles';
// 친구 모달
import FriendModal from '../../components/friendModal/index';
import Loading from '../../components/loading/Loading';
import { SSantaApi } from '../../apis/ssantaApi';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apis/url';
//recoil
import {
  selectUserId,
  Money,
  MyItems,
  IsCover,
  isLoggedIn,
  currentUser,
  NotiListState,
} from '../../store/store';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';

// import { CalendarAlert } from '../../components/room/calendaralert/Calendar';
import ShopAlert from '../../components/shop';
// 알림 관련
import { motion, Variants } from 'framer-motion';
import NotiModal from '../../components/notification/NotiModal';

export default function Home() {
  const BASE_URL = API_BASE_URL;
  // 친구 모달 관리
  const ACCESS_TOKEN = `${localStorage.getItem('jwt')}`;
  // console.log(ACCESS_TOKEN);
  const userId = parseInt(useRecoilValue(selectUserId));
  const [friendList, setFriendList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [scenenumber, setSceneNumber] = useState<number>(1);
  const [clickedItem, setClickedItem] = useState<number>(0);
  const [isClick, setIsClick] = useState<boolean>(false);

  const setUserMoney = useSetRecoilState(Money);
  const money = useRecoilValue(Money);

  const setUserItems = useSetRecoilState(MyItems);
  const item = useRecoilValue(MyItems);
  const [cost, setCost] = useState<number>(0);

  const setIsCover = useSetRecoilState(IsCover);
  const isCover = useRecoilValue(IsCover);

  const [randomTrees, setRandomTrees] = useState<string[]>([]);

  const navigate = useNavigate();

  const resetMoney = useResetRecoilState(Money);
  const resetMyItems = useResetRecoilState(MyItems);
  const resetIsCover = useResetRecoilState(isLoggedIn);
  const resetUser = useResetRecoilState(currentUser);
  const resetNoti = useResetRecoilState(NotiListState);
  //알림
  const [isOpen, setIsOpen] = useState(false);
  // 로그아웃
  function LogoutToHome() {
    logout();
    navigate('/login');
    setTimeout(() => {
      console.log('기달');
      location.reload();
    }, 1000);
  }
  function logout() {
    localStorage.clear();
    resetMoney;
    resetMyItems;
    resetIsCover;
    resetUser;
    resetNoti;
    console.log('1');
  }

  // const LogOut = () => { // 토큰을 찾을 수 없다고 뜹니다.
  //   console.log(ACCESS_TOKEN);
  //   axios
  //     .post('http://localhost:8080/api/user/logout', {
  //       headers: {
  //         Authorization: ACCESS_TOKEN,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       // token, recoil 값들이 locastorage에 저장됨
  //       localStorage.clear();
  //       navigate('/login');
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

  const instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });

  //items 정보불러오기
  // useEffect(() => {
  //   SSantaApi.getInstance().items(
  //     { userId: userId },
  //     {
  //       onSuccess(data) {
  //         // console.log(data);
  //         setUserItems(data.itemList);
  //       },
  //       navigate,
  //     },
  //   );
  // }, []);

  const [isLetter, setIsLetter] = useState<boolean>(false);

  useEffect(() => {
    let requestId: number;
    axios
      .all([
        getCoin(),
        getTree(),
        getItems(),
        getFriendList(),
        getFollowerList(),
        getFollowingList(),
      ])
      .then(
        axios.spread((res1, res2, res3, res4, res5, res6) => {
          setUserMoney(res1.data.coin);
          setRandomTrees(res2.data.tree);
          setUserItems(res3.data.itemList);
          setFriendList(res4.data);
          setFollowerList(res5.data);
          setFollowingList(res6.data);
          console.log(res1, res2, res3, res4, res5, res6);
          homeCanvas = new MainCanvas(userId, res2.data.tree);

          homeCanvas.setupOnce();
          requestId = requestAnimationFrame(render);
          console.log(randomTrees);
        }),
      )
      .catch((err) => {
        console.log(err);
      });
    return () => {
      cancelAnimationFrame(requestId);
      console.log('canvas 끝!');
    };
  }, []);

  const render = (time: number) => {
    setSceneNumber(homeCanvas._scenenumber);
    setIsClick(homeCanvas._isItemClick);
    setClickedItem(homeCanvas._clickedItem);

    if (homeCanvas._scenenumber === 1) {
      // console.log(this._camera.position);
      homeCanvas._renderer.render(homeCanvas._scene, homeCanvas._camera);
      homeCanvas.update(time);
      // console.log('!');

      requestAnimationFrame(render);
    } else {
      // inven scene
      homeCanvas._renderer.render(homeCanvas._scene2, homeCanvas._camera);
      homeCanvas.update2(time);

      requestAnimationFrame(render);
    }
  };

  function getCoin() {
    return instance.get('/coin');
  }
  function getTree() {
    return instance.get('tree');
  }
  function getItems() {
    return instance.get(`/store/items/${userId}`);
  }

  function getFriendList() {
    return instance.get('friend/recommend');
  }

  function getFollowingList() {
    return instance.get('friend/followings');
  }

  function getFollowerList() {
    return instance.get('friend/followers');
  }

  let homeCanvas: any;

  // 친구 검색: 추후 구현

  useEffect(() => {
    if (scenenumber === 2) {
      setIsCover(false);
    } else {
      setIsCover(true);
    }
  }, [scenenumber]);
  // 아이템에 따라 가격 다르게
  useEffect(() => {
    if (clickedItem <= 28) {
      setCost(1000);
    } else {
      setCost(2000);
    }
  }, [clickedItem]);

  // bgm
  const opts: YouTubeProps['opts'] = {
    height: '70',
    width: '70',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      // 유튜브 주소
      disablekb: 1,
      // controls: 0,
      fs: 0,
      modestbranding: 1,
    },
  };

  return (
    <Div>
      {/* render after three seconds */}
      <div
        // 메인화면 유튜브 BGM 제거/수정하고 싶으면 여기서!
        style={{
          position: 'fixed',
          bottom: -3,
          left: 0,
          zIndex: 1000,
        }}
      >
        <YouTube videoId="yyQL24ZMMjg" opts={opts} />
      </div>
      {/* 모달들 */}
      <Alert>들어갈래?</Alert>
      <HomeAlert>집으로 들어갈래?</HomeAlert>
      <TetrisAlert></TetrisAlert>
      <WitAlert></WitAlert>
      <MemoryAlert></MemoryAlert>
      <LetterAlert></LetterAlert>
      {/* <ShopAlert></ShopAlert> */}
      {/* <TreeModal data={data}></TreeModal> */}
      {/* 버튼들 */}

      {isCover ? (
        <TopBar>
          <MoneyState>
            <CoinImg src="img/coin.png"></CoinImg>
            {money}
          </MoneyState>
          <LogoutButton onClick={LogoutToHome}>
            <LogoutIcon></LogoutIcon>
          </LogoutButton>
        </TopBar>
      ) : null}
      {isCover ? (
        <BottomBar>
          <NotiConTainer
            as={motion.div}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            className="noti"
          >
            <NotiButton
              as={motion.button}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              알림
            </NotiButton>
          </NotiConTainer>

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
      <NotiModal isModal={isOpen} setIsModal={setIsOpen}></NotiModal>
      {isClick ? (
        <ShopAlert item={clickedItem} userId={userId} cost={cost}></ShopAlert>
      ) : null}
      <ModalDiv className="modal"></ModalDiv>
      <Loading></Loading>
      <ShopDiv id="shop"></ShopDiv>
      <Div id="main-canvas"></Div>
    </Div>
  );
}
