import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "userStatePersist",
    storage: localStorage,
});

export const userState = atom({
    key: "userState",
    default: {
        id: null,
        username: "",
        birthDay: "",
        gender: "",
        nickName: "",
        disability: "",
    },
    effects_UNSTABLE: [persistAtom], // persistAtom 추가
});
