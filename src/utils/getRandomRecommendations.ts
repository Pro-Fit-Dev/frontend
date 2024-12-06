interface ExerciseData {
    AGRDE_FLAG_NM: string;  // 연령대
    MBER_SEXDSTN_FLAG_CD: string;  // 성별 (M/F)
    SPORTS_STEP_NM: string; // 운동 단계 (준비운동/본운동/마무리운동)
    RECOMEND_MVM_NM: string;      // 운동 이름
}

export const getRandomRecommendations = (
    data: ExerciseData[],
    age: number,
    gender: string
): ExerciseData[] => {
    // 연령대 결정
    const ageGroup =
        age < 20
            ? '10대'
            : age < 30
                ? '20대'
                : age < 40
                    ? '30대'
                    : age < 50
                        ? '40대'
                        : age < 60
                            ? '50대'
                            : age < 70
                                ? '60대'
                                : '70대 이상';

    // 조건 필터링
    const filteredData = data.filter(
        (item) =>
            item.AGRDE_FLAG_NM === ageGroup &&
            item.MBER_SEXDSTN_FLAG_CD === gender
    );

    // 운동 단계별로 나눔
    const warmUp = filteredData.filter((item) => item.SPORTS_STEP_NM === '준비운동');
    const main = filteredData.filter((item) => item.SPORTS_STEP_NM === '본운동');
    const coolDown = filteredData.filter((item) => item.SPORTS_STEP_NM === '마무리운동');

    // 랜덤 추출
    const getRandomItems = (array: ExerciseData[], count: number) =>
        array.sort(() => 0.5 - Math.random()).slice(0, count);

    const selectedWarmUp = getRandomItems(warmUp, 2);
    const selectedMain = getRandomItems(main, 2);
    const selectedCoolDown = getRandomItems(coolDown, 1);

    // 최종 조합 (준비운동 → 본운동 → 마무리운동)
    return [...selectedWarmUp, ...selectedMain, ...selectedCoolDown];
};
