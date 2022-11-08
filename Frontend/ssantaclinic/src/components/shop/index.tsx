import React, { useState, useEffect, useRef } from 'react';
import { ItemAlert } from './styles';

export default function ShopAlert() {
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemId, setItemId] = useState<number>(0);

  function send(event: any) {
    setItemId(parseInt(event.target.parentElement.dataset.code));
  }

  useEffect(() => {
    console.log(itemId);
  }, [itemId]);

  return (
    <ItemAlert className="alert" ref={itemRef}>
      구매하시겠습니까?
      <button onClick={send}>ㅇㅇ</button>
    </ItemAlert>
  );
}
