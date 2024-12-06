import { atom } from 'recoil';

export const userId = atom({
    key: 'userId', // 고유 key
    default: {
        id: '',
        birthDay: '', // 생년월일
        gender: '',
    }, // 초기값
});