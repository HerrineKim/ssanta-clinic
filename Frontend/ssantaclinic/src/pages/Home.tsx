import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/signup">회원가입</Link>
      <Link to="/login">로그인</Link>
      <Link to="/wits">지혜의 숲</Link>
      <Link to="/memory">기억의 숲</Link>
      <Link to="/findPassword">비밀번호 찾기</Link>
      <Link to="/changePassword">비밀번호 변경</Link>
      <Link to="/letter">편지</Link>
      <Link to="/calendar">캘린더</Link>
      <Link to="/boxCreate">박스 생성</Link>
      <Link to="/room/:id">내 방 가기</Link>
      {/* 화면 전환해도 끊기지 않는 배경 음악으로 구현하려고 했는데 후순위로 미뤄야.. */}
      {/* 재생 목록 자체를 가져온 거라 사용자가 저희 리스트에서 선택해서 듣도록 */}
      {/* 버튼을 만들어서 숨기고 열고 할 수 있도록 */}
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/videoseries?list=PLwy0L32iMl2sCruz31LkuQrfQOz0XoGmy"
        frameBorder="0"
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  );
}
