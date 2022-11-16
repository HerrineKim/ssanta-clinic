import React, { useState, useEffect } from 'react';
import { ItemAlert, Button } from './styles';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/url';
// import { SSantaApi } from '../../apis/ssantaApi';
// import { useNavigate } from 'react-router-dom';

interface Iprops {
  item: number;
  userId: number;
  cost: number;
}

interface Request {
  itemId: number;
  count: number;
  userId: number;
}

export default function ShopAlert(props: Iprops) {
  const BASE_URL = API_BASE_URL;
  // const [itemId, setItemId] = useState<number>(0);
  // const navigate = useNavigate();

  const { item, userId, cost } = props;
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<Request>();
  const TOKEN = localStorage.getItem('jwt') || '';

  // const money = useRecoilValue(Money);
  console.log('shopalert:', props);

  function send(event: any) {
    axios({
      url: BASE_URL + 'store/buy',
      method: 'post',
      data: data,
      headers: {
        Authorization: TOKEN,
      },
    }).then((res) => {
      console.log(res);
    });
  }

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
      {item}구매하시겠습니까? 개당 {cost}입니다.
      <input type="number" value={count} onChange={changeCount} min="0"></input>
      <Button onClick={send}>구매!</Button>
      {/* <Button onClick={close}>ㄴㄴ</Button> */}
    </ItemAlert>
  );
}
