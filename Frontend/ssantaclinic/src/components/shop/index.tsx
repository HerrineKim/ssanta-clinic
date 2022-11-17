import React, { useState, useEffect } from 'react';
import { ItemAlert, Button, ButtonDiv, TextSpan } from './styles';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/url';
import { Money, MyItems } from '../../store/store';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// import { SSantaApi } from '../../apis/ssantaApi';
// import { useNavigate } from 'react-router-dom';

interface Iprops {
  item: number;
  userId: number;
  cost: number;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Request {
  itemId: number;
  count: number;
  userId: number;
}

export default function ShopAlert(props: Iprops) {
  // const [itemId, setItemId] = useState<number>(0);
  // const navigate = useNavigate();
  const BASE_URL = API_BASE_URL;

  const setUserMoney = useSetRecoilState(Money);
  const money = useRecoilValue(Money);
  const setUserItems = useSetRecoilState(MyItems);
  const items = useRecoilValue(MyItems);

  const { item, userId, cost, onClose } = props;
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<Request>();
  const [isBuy, setIsBuy] = useState<boolean>(false);
  const TOKEN = localStorage.getItem('jwt') || '';
  const [isMoneyPossible, setIsMoneyPossible] = useState<boolean>(true);
  const [isItemPossible, setIsItemPossible] = useState<boolean>(true);
  // const money = useRecoilValue(Money);
  console.log('shopalert:', props);

  function send(event: any) {
    if (isMoneyPossible && isItemPossible && count > 0) {
      setIsBuy(true);
      axios({
        url: `${BASE_URL}store/buy`,
        method: 'post',
        data: data,
        headers: {
          Authorization: TOKEN,
        },
      }).then((res) => {
        console.log(res);
        setIsBuy(false);
        setUserMoney(res.data.money);
      });
    }
  }

  function changeCount(event: any) {
    setCount(parseInt(event.target.value));
  }

  useEffect(() => {
    setData({
      itemId: item,
      count: count,
      userId: userId,
    });
    if (money < cost * count) {
      setIsMoneyPossible(false);
    } else {
      setIsMoneyPossible(true);
    }

    if (items.length + count > 24) {
      setIsItemPossible(false);
    } else {
      setIsItemPossible(true);
    }
  }, [count]);

  return (
    <ItemAlert className="alert">
      {isBuy ? <span>구매중</span> : null}
      <span>{item}구매하시겠습니까?</span>
      <span>개당 {cost}입니다.</span>
      <input type="number" value={count} onChange={changeCount} min="0"></input>
      <ButtonDiv>
        <Button onClick={send}>구매!</Button>
        <Button
          onClick={() => {
            onClose(true);
          }}
        >
          ㄴㄴ
        </Button>
      </ButtonDiv>

      {isItemPossible && isMoneyPossible ? null : isItemPossible ? (
        <TextSpan>돈이 부족합니다.</TextSpan>
      ) : isMoneyPossible ? (
        <TextSpan>아이템칸이 부족합니다.</TextSpan>
      ) : (
        <TextSpan>돈도 부족, 아이템칸도 부족</TextSpan>
      )}
    </ItemAlert>
  );
}
