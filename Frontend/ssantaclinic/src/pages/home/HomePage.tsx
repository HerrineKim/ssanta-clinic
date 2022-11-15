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
} from './styles';
// 친구 모달
import FriendModal from '../../components/friendModal/index';
import Loading from '../../components/loading/Loading';
import { SSantaApi } from '../../apis/ssantaApi';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apis/url';
//recoil
import { selectUserId, Money, MyItems, IsCover } from '../../store/store';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
// import { ShopAlert } from '../../components/main/shopalert/ShopAlert';

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

  const setUserItems = useSetRecoilState(MyItems);
  const item = useRecoilValue(MyItems);

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
          setUserItems(data.itemList);
        },
        navigate,
      },
    );
  }, []);

  // const getItems = () =>
  //   axios({
  //     url: `${BASE_URL}coin`,
  //     method: 'get',
  //     headers: {
  //       Authorization: ACCESS_TOKEN,
  //     },
  //   }).then((res) => {
  //     setUserMoney(res.data.coin);
  //     console.log(res);
  //   });

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

  const homeCanvas = new MainCanvas(userId);

  const [scenenumber, setSceneNumber] = useState<number>(1);

  const render = (time: number) => {
    setSceneNumber(homeCanvas._scenenumber);

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

  useEffect(() => {
    console.log(scenenumber);
  }, [scenenumber]);

  useEffect(() => {
    homeCanvas.setupOnce();
    const requestId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(requestId);
      console.log('canvas 끝!');
    };
  }, []);

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
  // setInterval(() => {
  //   console.log(homeCanvas._isShop);
  // }, 1000);
  // useEffect(() => {
  //   console.log(scenenumber);
  // }, [scenenumber]);
  return (
    <Div>
      {/* <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
        }}
      >
        <YouTube videoId="8MhtzapYzGo" opts={opts} />
      </div> */}
      {/* 모달들 */}
      {/* 친구 모달 */}
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
          <LogoutButton>
            <LogoutIcon></LogoutIcon>
          </LogoutButton>
        </TopBar>
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
