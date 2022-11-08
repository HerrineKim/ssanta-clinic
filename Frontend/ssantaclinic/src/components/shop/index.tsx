import React, { useState, useEffect, useRef } from 'react';
import { ItemAlert } from './styles';
import axios from 'axios';

interface Iprops {
  item: number;
}

interface Request {
  itemId: number;
  count: number;
}

export default function ShopAlert(props: Iprops[]) {
  // const [itemId, setItemId] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<Request>();
  console.log('shopalert:', props);

  function send(event: any) {
    axios({
      url: 'https://k7a201.p.ssafy.io/api/store/buy',
      method: 'post',
      data: data,
    }).then((res) => {
      console.log(res);
    });
  }

  function changeCount(event: any) {
    setCount(event.target.value);
  }

  useEffect(() => {
    setData({
      itemId: props[0].item,
      count: count,
    });
  }, [count]);

  return (
    <ItemAlert className="alert">
      {props[0].item}구매하시겠습니까?
      <input type="number" value={count} onChange={changeCount}></input>
      <button onClick={send}>ㅇㅇ</button>
    </ItemAlert>
  );
}
