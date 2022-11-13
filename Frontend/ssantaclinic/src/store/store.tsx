import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IUser {
  email: string;
  id: string;
  nickname: string;
  noti: Array<string>;
  // jwt: string;
}

export interface ILetter {
  isList: boolean;
  isWirte: boolean;
}

export const currentUser = atom<IUser>({
  key: 'user',
  default: {
    email: '',
    id: '',
    nickname: '',
    noti: [],
    // jwt: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const letterState = atom<ILetter>({
  key: 'letter',
  default: {
    isList: true,
    isWirte: false,
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

export const selectLetterList = selector<boolean>({
  key: 'nowLetterState',
  get: ({ get }) => {
    const letter = get(letterState);
    return letter.isList;
  },
});

export const selectLetterWrite = selector<boolean>({
  key: 'nowWriteState',
  get: ({ get }) => {
    const letter = get(letterState);
    return letter.isWirte;
  },
});

export const NotiListState = atom({
  key: 'NotiList',
  default: [],
});
