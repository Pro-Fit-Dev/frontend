export const formatPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber
        .replace(/[^0-9]/g, '') // 숫자가 아닌 것 제거
        .replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3'); // 하이픈 삽입
};
