import React, { useState, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import LogoutIcon from '@mui/icons-material/Logout';
// import { useCanvas } from '../../hooks/useCanvas';
import { CoinImg, Div, ModalDiv, ShopDiv, ShopTalk } from './styles';
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
  NotiCount,
  DescriptionButton,
} from './styles';
// 친구 모달
import FriendModal from '../../components/friendModal/index';
import Loading from '../../components/loading/Loading';

import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apis/url';
//recoil
import {
  selectUserId,
  Money,
  MyItems,
  IsCover,
  currentUser,
} from '../../store/store';
import {
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilState,
} from 'recoil';
import ItemModal from '../../components/itemModal/ItemModal';
// import { CalendarAlert } from '../../components/room/calendaralert/Calendar';
import ShopAlert from '../../components/shop';
// 설명 관련
import DescriptionModal from '../../components/main/description/DescriptionModal';
// 알림 관련
import { motion } from 'framer-motion';
import NotiModal from '../../components/notification/NotiModal';
import { notiState } from '../../store/Notification';
import { EventSourcePolyfill } from 'event-source-polyfill';
const EventSource = EventSourcePolyfill;
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

  const [isShop, setIsShop] = useState<boolean>(false);
  const [isItem, setIsItem] = useState<boolean>(false);

  const [isTetris, setIsTetris] = useState<boolean>(false);
  const [isTetris2, setIsTetris2] = useState<boolean>(false);

  const [isMemory, setIsMemory] = useState<boolean>(false);
  const [isMemory2, setIsMemory2] = useState<boolean>(false);

  const [isWit, setIsWit] = useState<boolean>(false);
  const [isWit2, setIsWit2] = useState<boolean>(false);

  const [isLetter, setIsLetter] = useState<boolean>(false);
  const [isLetter2, setIsLetter2] = useState<boolean>(false);

  const setUserMoney = useSetRecoilState(Money);
  const money = useRecoilValue(Money);

  const setUserItems = useSetRecoilState(MyItems);

  const [cost, setCost] = useState<number>(0);
  const [isCancle, setIsCancel] = useState<boolean>(false);
  const setIsCover = useSetRecoilState(IsCover);
  const isCover = useRecoilValue(IsCover);

  const [randomTrees, setRandomTrees] = useState<string[]>([]);

  const navigate = useNavigate();

  const resetUser = useResetRecoilState(currentUser);

  // 설명
  const [isDescription, setIsDescription] = useState(false);
  //알림
  const [isOpen, setIsOpen] = useState(false);
  const TOKEN = localStorage.getItem('jwt') || '';
  const ID = useRecoilValue(selectUserId);
  const [notis, setNotis] = useRecoilState(notiState);

  useEffect(() => {
    if (isTetris2 || isMemory2 || isWit2 || isLetter2) {
      setIsCover(false);
    } else {
      setIsCover(true);
    }
  }, [isTetris2, isMemory2, isWit2, isLetter2]);

  useEffect(() => {
    if (TOKEN) {
      // console.log('sse');
      const eventSource = new EventSource(BASE_URL + 'noti/sub/' + ID, {
        headers: {
          Authorization: TOKEN,
        },
        heartbeatTimeout: 120000 * 5,
      });
      // eventSource.onopen = (event) => console.log('open', event); // <2>
      getNotiList(TOKEN);
      // eventSource.onerror = (event) => {
      //   console.log('error', event);
      // };

      eventSource.onmessage = function (event) {
        try {
          const data: any = JSON.parse(event.data);
          let isInList = false;
          for (const noti of notis) {
            if (noti.notiId === data.notiId) {
              console.log(noti.notiId, data.notiId);
              isInList = true;
            }
          }
          if (!isInList) {
            // console.log(data);
            setNotis((notiList) => [...notiList, data]);
          }
        } catch {
          // console.log('sse 패스');
        }
      };
    }
  }, []);

  useEffect(() => {
    setIsLetter2(isLetter);
  }, [isLetter]);

  useEffect(() => {
    setIsTetris2(isTetris);
  }, [isTetris]);

  useEffect(() => {
    setIsMemory2(isMemory);
  }, [isMemory]);

  useEffect(() => {
    setIsWit2(isWit);
  }, [isWit]);

  function getNotiList(TOKEN: any) {
    // console.log('비동기 안되냐');
    axios
      .get(BASE_URL + 'noti/list/' + ID, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        // console.log(res, '리스트');
      })
      .catch((err) => {
        // console.log(err.response);
      });
  }
  // 로그아웃
  function LogoutToHome() {
    resetUser;
    logout();
    navigate('/login');
    location.reload();
  }
  function logout() {
    localStorage.clear();
  }

  const instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });

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
          // console.log(res1, res2, res3, res4, res5, res6);
          homeCanvas = new MainCanvas(userId, res2.data.tree);

          homeCanvas.setupOnce();
          requestId = requestAnimationFrame(render);
          // console.log(randomTrees);
        }),
      )
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
        // console.log(err);
      });
    return () => {
      cancelAnimationFrame(requestId);
      cancelAnimationFrame(id);
      // console.log('canvas 끝!');
    };
  }, []);
  let id: number;
  const render = (time: number) => {
    if (homeCanvas._scenenumber === 1) {
      homeCanvas._renderer.render(homeCanvas._scene, homeCanvas._camera);
      homeCanvas.update(time);

      id = requestAnimationFrame(render);
    } else {
      // inven scene
      homeCanvas._renderer.render(homeCanvas._scene2, homeCanvas._camera);
      homeCanvas.update2(time);

      id = requestAnimationFrame(render);
    }
    setSceneNumber(homeCanvas._scenenumber);

    setClickedItem(homeCanvas._clickedItem);
    setIsShop(homeCanvas._isShop);
    setIsTetris(homeCanvas._isGame1);
    setIsMemory(homeCanvas._isGame4);
    setIsWit(homeCanvas._isGame2);
    setIsLetter(homeCanvas._isLetter);
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
    // console.log(clickedItem);
    if (clickedItem === 0) {
      setIsCancel(false);
    } else if (0 < clickedItem && clickedItem <= 28) {
      setIsCancel(true);
      setCost(1000);
    } else {
      setIsCancel(true);
      setCost(2000);
    }
    // console.log('clickedItem 변경:', clickedItem);
  }, [clickedItem]);

  // bgm
  const opts: YouTubeProps['opts'] = {
    height: '70',
    width: '70',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      disablekb: 1,
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
      {isShop || isCover ? (
        <TopBar>
          <DescriptionButton
            as={motion.button}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsDescription(!isDescription)}
          >
            설명
          </DescriptionButton>
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
            <NotiCount>{notis.length}</NotiCount>
          </NotiConTainer>

          <ItemButton onClick={() => setIsItem(true)}>아이템</ItemButton>
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
      {isTetris2 && <TetrisAlert tetris={setIsTetris2}></TetrisAlert>}
      {isMemory2 && <MemoryAlert memory={setIsMemory2}></MemoryAlert>}
      {isWit2 && <WitAlert wit={setIsWit2}></WitAlert>}
      {isLetter2 && <LetterAlert letter={setIsLetter2}></LetterAlert>}
      {scenenumber === 2 ? (
        <ShopTalk>사고 싶은 아이템을 클릭하세요.</ShopTalk>
      ) : null}
      <FriendModal
        isModal={isModal}
        setIsModal={setIsModal}
        friendList={friendList}
        followingList={followingList}
        followerList={followerList}
      ></FriendModal>
      <NotiModal isModal={isOpen} setIsModal={setIsOpen}></NotiModal>
      <DescriptionModal
        isModal={isDescription}
        setIsModal={setIsDescription}
      ></DescriptionModal>
      {isCancle ? (
        <ShopAlert
          item={clickedItem}
          userId={userId}
          cost={cost}
          onClose={setIsCancel}
        ></ShopAlert>
      ) : null}
      {isItem ? <ItemModal onClose={setIsItem}></ItemModal> : null}
      <ModalDiv className="modal"></ModalDiv>
      <Loading></Loading>
      <ShopDiv id="shop"></ShopDiv>
      <Div id="main-canvas"></Div>
    </Div>
  );
}
