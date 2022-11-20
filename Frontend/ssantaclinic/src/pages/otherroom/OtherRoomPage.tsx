/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube, { YouTubeProps } from 'react-youtube';
import Loading from '../../components/loading/Loading';
import { Wrapper, CanvasContainer, ToHomeButton, FollowButton } from './styles';
import { OtherRoomThree } from '../../three/OtherRoomThree';
import { OtherCalendarAlert } from '../../components/room/calendaralert/OtherCalendar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apis/url';
import { useParams } from 'react-router-dom';

export const OtherRoomPage = () => {
  const ACCESS_TOKEN = localStorage.getItem('jwt');
  const BASE_URL = API_BASE_URL;

  const param = useParams();
  const OtherID2 = param.id;
  const OtherID = window.location.href.split('/')[4];
  // console.log(OtherID2, OtherID);

  let roomCanvas: any;
  useEffect(() => {
    let requestId1: number;
    axios
      .get(BASE_URL + 'user/detail/' + OtherID, {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        // console.log(res.data);
        roomCanvas = new OtherRoomThree(res.data.treeUrl);
        requestId1 = requestAnimationFrame(roomCanvas.render.bind(roomCanvas));
      })
      .catch((err) => {
        // console.log(err.response);
      });
    return () => {
      cancelAnimationFrame(requestId1);
      roomCanvas.cancle();
    };
  }, []);

  // 팔로잉 목록
  const [followingList, setFollowingList] = useState<number[]>([]);
  const getFollowingList = () => {
    axios
      .get(BASE_URL + 'friend/followings', {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        // userId만 추출해서 배열에 저장
        // console.log(res.data);
        const followingList = res.data.map(
          (following: any) => following.userId,
        );
        // console.log(followingList);
        setFollowingList(followingList);
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

  useEffect(() => {
    getFollowingList();
  }, []);

  // 팔로우 함수
  const handleFollow = () => {
    if (!followingList.includes(Number(OtherID))) {
      axios
        .post(
          BASE_URL + 'friend/follow',
          { userId: Number(OtherID) },
          {
            headers: {
              Authorization: ACCESS_TOKEN,
            },
          },
        )
        .then((res) => {
          // console.log(res.data);
          getFollowingList();
        })
        .catch((err) => {
          // console.log(err.response);
        });
    } else {
      axios
        .delete(BASE_URL + 'friend/follow', {
          data: { userId: Number(OtherID) },
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        })
        .then((res) => {
          // console.log(res.data);
          getFollowingList();
        })
        .catch((err) => {
          // console.log(err.response);
        });
    }
  };

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

  const navigate = useNavigate();

  function ToHome() {
    navigate('/');
  }
  return (
    <Wrapper>
      <div
        // 메인화면 유튜브 BGM 제거/수정하고 싶으면 여기서!
        style={{
          position: 'fixed',
          bottom: -3,
          left: 0,
          zIndex: 1000,
        }}
      >
        <YouTube videoId="9QxFoMEkYBA" opts={opts} />
      </div>

      <OtherCalendarAlert></OtherCalendarAlert>
      <CanvasContainer id="other-room-canvas">
        <Loading></Loading>
      </CanvasContainer>
      {/* 만약 url 마지막의 숫자가 followingList에 있으면 팔로잉 버튼, 없으면 팔로우 버튼 */}
      {followingList.includes(Number(OtherID)) ? (
        <FollowButton
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFollow}
        >
          팔로잉
        </FollowButton>
      ) : (
        <FollowButton
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFollow}
        >
          팔로우
        </FollowButton>
      )}
      <ToHomeButton
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={ToHome}
      >
        🏠
      </ToHomeButton>
    </Wrapper>
  );
};
