import { atom, selector } from 'recoil';

export interface IUser {
  email: string;
  id: string;
  nickname: string;
  // jwt: string;
}

export const currentUser = atom<IUser>({
  key: 'user',
  default: {
    email: '',
    id: '',
    nickname: '',
    // jwt: '',
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
