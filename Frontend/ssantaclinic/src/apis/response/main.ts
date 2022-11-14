export interface ItemsRes {
  userId: Item[];
}

interface Item {
  itemImg: string;
  price: string;
  // 아이템이름??
  nickname: string;
}

export interface MoneyReq {
  money: number;
}
