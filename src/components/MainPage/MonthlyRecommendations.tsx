import React, { useEffect, useState } from 'react';
import { FindCSV } from '../../recoil/types/FindCSV';
import { useRecoilValue } from 'recoil';
import { userId } from '../../recoil/atoms/userId';
//import { parseCSV } from '../../utils/csvParser';
import { calculateAge } from '../../utils/calculateAge';
import { getRandomRecommendations } from '../../utils/getRandomRecommendations';
import styled from 'styled-components';

const mockUser = {
    id: 'test123',
    birthDay: '2000-01-01', // 생년월일
    gender: 'M', // 성별 (M/F)
};

const mockCSVData = [
    { AGRDE_FLAG_NM: '20대', MBER_SEXDSTN_FLAG_CD: 'M', SPORTS_STEP_NM: '준비운동', RECOMEND_MVM_NM: '스트레칭' },
    { AGRDE_FLAG_NM: '20대', MBER_SEXDSTN_FLAG_CD: 'M', SPORTS_STEP_NM: '본운동', RECOMEND_MVM_NM: '푸쉬업' },
    { AGRDE_FLAG_NM: '20대', MBER_SEXDSTN_FLAG_CD: 'M', SPORTS_STEP_NM: '본운동', RECOMEND_MVM_NM: '스쿼트' },
    { AGRDE_FLAG_NM: '20대', MBER_SEXDSTN_FLAG_CD: 'M', SPORTS_STEP_NM: '마무리운동', RECOMEND_MVM_NM: '요가' },
    { AGRDE_FLAG_NM: '20대', MBER_SEXDSTN_FLAG_CD: 'M', SPORTS_STEP_NM: '준비운동', RECOMEND_MVM_NM: '러닝' },
];

const stepImages: Record<string, string> = {
    준비운동: '/src/assets/images/ready.png',
    본운동: '/src/assets/images/run.png',
    마무리운동: '/src/assets/images/finish.png',
};

const MonthlyRecommendations = () => {
    const user = useRecoilValue(userId);
    const [recommendations, setRecommendations] = useState<FindCSV[]>([]);

    useEffect(() => {
        const loadRecommendations = async () => {
            const data = mockCSVData; // Mock CSV 데이터
            const age = calculateAge(mockUser.birthDay); // Mock 유저 데이터로 나이 계산
            const filteredRecommendations = getRandomRecommendations(data, age, mockUser.gender);
            setRecommendations(filteredRecommendations);
            // const data = await parseCSV('/assets/data/국민_연령별_추천_운동_정보.csv');
            // const age = calculateAge(user.birthDay);
            // const filteredRecommendations = getRandomRecommendations(data, age, user.gender);
            // setRecommendations(filteredRecommendations);
        };

        loadRecommendations();
    }, [user]);

    return (
        <Container>
            <Title>이 달의 운동 추천</Title>
            <Description>클릭하면 해당 운동을 할 수 있는 유튜브로 이동합니다!</Description>
            <Divider />
            <ScrollWrapper>
                {recommendations.map((item, idx) => (
                    <RecommendationCard
                        key={idx}
                        background={stepImages[item.SPORTS_STEP_NM]}
                        onClick={() =>
                            window.open(
                                `https://www.youtube.com/results?search_query=${encodeURIComponent(
                                    `${item.RECOMEND_MVM_NM} 운동 가이드`
                                )}`,
                                '_blank'
                            )
                        }
                    >
                        <RecommendationName>{item.RECOMEND_MVM_NM}</RecommendationName>
                        <StepLabel>{item.SPORTS_STEP_NM}</StepLabel>
                    </RecommendationCard>
                ))}
            </ScrollWrapper>
        </Container >
    );
};

export default MonthlyRecommendations;

const Container = styled.div`
  border: 1px solid #8ec6c5;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  color: #3c6e71;
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #dfdfdf;
  margin: 0 0 10px 0;
`;

const ScrollWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #8ec6c5;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
`;

const RecommendationCard = styled.div<{ background: string }>`
  flex: 0 0 150px;
  height: 150px;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #555555;
  position: relative;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.background});
    background-size: cover;
    background-position: center;
    opacity: 0.3; 
    border-radius: 8px; 
    z-index: 0;
  }

  z-index: 1;
  overflow: hidden;
`;

const Description = styled.p`
    font-size: 0.8rem;
    color: #555555;
  margin: 5px 0 10px 0;
`;

const RecommendationName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const StepLabel = styled.div`
  font-size: 0.8rem;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #222;
  z-index: 1;
`;