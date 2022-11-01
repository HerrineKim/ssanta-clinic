import { atom, selector } from 'recoil';

export interface IUser {
  email: string;
  token: string;
  nickname: string;
}

export const currentUser = atom<IUser>({
  key: 'user',
  default: {
    email: '',
    token: '',
    nickname: '',
  },
});

export const selectToken = selector<string>({
  key: 'nowUserToken',
  get: ({ get }) => {
    const user = get(currentUser);
    return user.token;
  },
});

export const selectNickname = selector<string>({
  key: 'nowUserNickname',
  get: ({ get }) => {
    const user = get(currentUser);
    return user.nickname;
  },
});
