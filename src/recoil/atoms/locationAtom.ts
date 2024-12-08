import { atom } from "recoil";

export interface UserCoordinates {
    latitude: number;
    longitude: number;
    cityName?: string;
    districtName?: string;
}

export const userLocationAtom = atom<UserCoordinates | null>({
    key: "userLocationAtom",
    default: null, // 초기값 없음
});
