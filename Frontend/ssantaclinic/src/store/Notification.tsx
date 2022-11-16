import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface INoti {
  notiId: number;
  url: string;
  message: string;
  type: string;
}

export const notiState = atom<INoti[]>({
  key: 'notification',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// export const selectUserId = selector<string>({
//     key: 'nowUserId',
//     get: ({ get }) => {
//       const user = get(currentUser);
//       return user.id;
//     },
//   });
