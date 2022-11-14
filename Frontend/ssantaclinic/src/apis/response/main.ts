export interface ItemsRes {
  items: Item[];
}

interface Item {
  itemImg: string;
  price: string;
  // 아이템이름??
  nickname: string;
}

export interface MoneyRes {
  money: number;
}
