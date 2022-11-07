import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogOut = () => {
  const navigate = useNavigate();

  //   const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
  //     e.preventDefault();
  //     console.log('제출됨');
  //     axios
  //       .post('http://localhost:8080' + '/api/user/login', {
  //         email: email,
  //         password: password,
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         accessToken = res.headers.authorization;
  //         localStorage.setItem('jwt', accessToken);
  //         setUserState({
  //           email: email,
  //           id: res.data.userId,
  //           nickname: res.data.nickName,
  //         });
  //         const myRoomPath = '/room/' + res.data.userId;
  //         navigate(myRoomPath); // Login 성공하면 일단 내 방으로
  //       })
  //       .catch((err) => {
  //         console.log(err.response);
  //       });
  //   };
  // \

  const onClickHandler = () => {
    if (confirm('정말 로그아웃 하시겠습니까')) {
      localStorage.setItem('jwt', '');
      navigate('/');
    } else {
      navigate('/');
    }
  };
  return (
    <div id="logout-container">
      <div id="logout">
        <button type="submit" className="logoutButton" onClick={onClickHandler}>
          로그아웃
        </button>
      </div>
    </div>
  );
};
