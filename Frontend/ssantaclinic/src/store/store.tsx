import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IUser {
  email: string;
  id: string;
  nickname: string;
  noti: Array<string>;
  isLogin: boolean;
  // jwt: string;
}

export interface ILetter {
  isList: boolean;
}

interface isLoggedIn {
  isLoggedIn: boolean;
}

const isLoggedIn = atom<isLoggedIn>({
  key: 'isLoggedin',
  default: {
    isLoggedIn: localStorage.getItem('jwt') ? true : false,
  },
});

// iscover
export const IsCover = atom<boolean>({
  key: 'isCover',
  default: true,
});

// money
export const Money = atom<number>({
  key: 'money',
  default: 0,
});

interface Items {
  items: Item[];
}

interface Item {
  itemImg: string;
  price: string;
  // 아이템이름??
  nickname: string;
}

// items
export const MyItems = atom<number[]>({
  key: 'items',
  default: [],
});

export const isLogIn = selector<boolean>({
  key: 'isLogIn',
  get: ({ get }) => {
    const isLogdIn = get(isLoggedIn);
    return isLogdIn.isLoggedIn;
  },
});

export const currentUser = atom<IUser>({
  key: 'user',
  default: {
    email: '',
    id: '',
    nickname: '',
    noti: [],
    isLogin: false,
    // jwt: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const letterState = atom<ILetter>({
  key: 'letter',
  default: {
    isList: true,
  },
});
// export const selectToken = selector({
//   key: 'userToken',
//   get: ({ get }) => {
//     const user = get(currentUser);
//     return user.jwt;
//   },
// });

export const selectEmail = selector<string>({
  key: 'nowUserEmail',
  get: ({ get }) => {
    const user = get(currentUser);
    return user.email;
  },
});

export const selectUserId = selector<string>({
  key: 'nowUserId',
  get: ({ get }) => {
    const user = get(currentUser);
    return user.id;
  },
});

export const selectUserNickname = selector<string>({
  key: 'nowUserNickname',
  get: ({ get }) => {
    const user = get(currentUser);
    return user.nickname;
  },
});
export const selectUserIsLogin = selector<boolean>({
  key: 'IsLogin',
  get: ({ get }) => {
    const user = get(currentUser);
    return user.isLogin;
  },
});

export const selectLetterList = selector<boolean>({
  key: 'nowLetterState',
  get: ({ get }) => {
    const letter = get(letterState);
    return letter.isList;
  },
});

export const NotiListState = atom({
  key: 'NotiList',
  default: [],
});
