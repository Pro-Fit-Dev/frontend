import styled from "styled-components";

const MonthlyRecommendations = () => {
    return (
        <Container>
            <Title>이 달의 운동 추천</Title>
            <RecommendationWrapper>
                {[1, 2].map((_, idx) => (
                    <RecommendationCard key={idx} />
                ))}
            </RecommendationWrapper>
        </Container>
    );
};

export default MonthlyRecommendations;

// 스타일 컴포넌트 정의
const Container = styled.div`
    border: 1px solid #8ec6c5;
    border-radius: 10px;
    padding: 20px;
    width: 100%; /* 부모 컨테이너 너비에 맞게 확장 */
    box-sizing: border-box;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #3c6e71; /* 헤더 색상 추가 */
`;

const RecommendationWrapper = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: scroll;
    padding-bottom: 10px;

    /* 스크롤바 스타일링 (크롬/엣지) */
    &::-webkit-scrollbar {
        height: 8px;
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
    min-width: 150px;
    height: 100px;
    background-color: #f0f0f0;
    border-radius: 5px;
`;