export const calculateBMI = (height: number, weight: number): number => {
    if (height <= 0 || weight <= 0) {
        throw new Error('키와 몸무게는 0보다 커야 합니다.');
    }
    return +(weight / (height / 100) ** 2).toFixed(2);
};
