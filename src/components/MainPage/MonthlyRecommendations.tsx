import React from "react";
import styled from "styled-components";

const MonthlyRecommendations = () => {
    return (
        <Container>
            <Title>이 달의 운동 추천</Title>
            <ScrollWrapper>
                {[1, 2, 3, 4, 5].map((_, idx) => (
                    <RecommendationCard key={idx}>
                        운동 {idx + 1}
                    </RecommendationCard>
                ))}
            </ScrollWrapper>
        </Container>
    );
};

export default MonthlyRecommendations;

// 스타일 정의
const Container = styled.div`
    border: 1px solid #8ec6c5;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #3c6e71;
`;

const ScrollWrapper = styled.div`
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 20px;

    /* 스크롤바 스타일 */
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

const RecommendationCard = styled.div`
    flex: 0 0 150px; /* 고정된 너비를 가진 카드 */
    height: 150px; /* 정사각형 카드 */
    background-color: #f9f9f9;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    color: #555555;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;
