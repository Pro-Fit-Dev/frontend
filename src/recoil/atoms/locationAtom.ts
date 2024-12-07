import { atom } from 'recoil';

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export const locationAtom = atom<Coordinates | null>({
    key: 'locationAtom', // 고유 key
    default: null, // 초기값
});
