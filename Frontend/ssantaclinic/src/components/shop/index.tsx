import React, { useState, useEffect } from 'react';
import { ItemAlert, Button } from './styles';
import axios from 'axios';

// import { SSantaApi } from '../../apis/ssantaApi';
// import { useNavigate } from 'react-router-dom';

interface Iprops {
  item: number;
  userId: number;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Request {
  itemId: number;
  count: number;
  userId: number;
}

export default function ShopAlert(props: any) {
  // const [itemId, setItemId] = useState<number>(0);
  // const navigate = useNavigate();
  const { item, userId, onClose } = props;
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
      <Button onClick={send}>ㅇㅇ</Button>
      {/* <Button onClick={close}>ㄴㄴ</Button> */}
    </ItemAlert>
  );
}
