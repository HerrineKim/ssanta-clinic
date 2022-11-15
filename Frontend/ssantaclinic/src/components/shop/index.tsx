import React, { useState, useEffect } from 'react';
import { ItemAlert } from './styles';
import axios from 'axios';

// import { SSantaApi } from '../../apis/ssantaApi';
// import { useNavigate } from 'react-router-dom';

interface Iprops {
  item: number;
  userId: number;
}

interface Request {
  itemId: number;
  count: number;
  userId: number;
}

export default function ShopAlert(props: Iprops) {
  // const [itemId, setItemId] = useState<number>(0);
  // const navigate = useNavigate();
  const { item, userId } = props;
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<Request>();
  const TOKEN = localStorage.getItem('jwt') || '';

  // const money = useRecoilValue(Money);
  console.log('shopalert:', props);

  function send(event: any) {
    axios({
      url: 'http://localhost:8080/api/store/buy',
      method: 'post',
      data: data,
      headers: {
        Authorization: TOKEN,
      },
    }).then((res) => {
      console.log(res);
    });
  }

  // function send(event: any) {
  //   SSantaApi.getInstance().shop(
  //     { itemId: props[0].item, count: count, userId: userId },
  //     {
  //       onSuccess(data) {
  //         setUserMoney({ money: data.money });
  //       },
  //       navigate,
  //     },
  //   );
  // }

  function changeCount(event: any) {
    setCount(event.target.value);
  }

  useEffect(() => {
    setData({
      itemId: item,
      count: count,
      userId: userId,
    });
  }, [count]);

  return (
    <ItemAlert className="alert">
      {item}구매하시겠습니까?
      <input type="number" value={count} onChange={changeCount} min="0"></input>
      <button onClick={send}>ㅇㅇ</button>
    </ItemAlert>
  );
}
