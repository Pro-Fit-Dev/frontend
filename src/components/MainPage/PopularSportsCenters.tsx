import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PopularSportsCenters = () => {
    const navigate = useNavigate();

    const handleViewMoreClick = () => {
        navigate("/MapPage");
    };

    return (
        <Container>
            <Header>
                <Title>인기 스포츠 지원센터</Title>
                <MoreButton onClick={handleViewMoreClick}>더보기</MoreButton>
            </Header>
            <Description>가장 인기 많은 스포츠는 어떤 게 있는지 확인해보세요!</Description>
            <Divider />
            <CardContainer>
                {[1, 2, 3].map((_, idx) => (
                    <Card key={idx}>
                        <CardContent>
                            <CardTitle>XX 체육관</CardTitle>
                            <CardSubtitle>경기도 시흥시 산기대학로 어쩌고</CardSubtitle>
                        </CardContent>
                        <CardDistance>2km</CardDistance>
                    </Card>
                ))}
            </CardContainer>
        </Container>
    );
};

export default PopularSportsCenters;

// 스타일 정의
const Container = styled.div`
    border: 1px solid #8ec6c5;
    border-radius: 10px;
    padding: 30px;
    margin-bottom: 20px;
    background-color: #ffffff;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const Title = styled.h2`
    font-size: 1.3rem;
    color: #3c6e71;
    margin: 0;
`;

const MoreButton = styled.button`
    border: none;
    background: none;
    text-decoration: underline;
    color: #3c6e71;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0;

    &:hover {
        color: #8ec6c5;
    }
`;

const Description = styled.p`
    font-size: 0.9rem;
    color: #555555;
    margin-bottom: 20px;
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #dfdfdf;
    margin: 0 0 10px 0;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 15px 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const CardTitle = styled.h3`
    font-size: 1rem;
    color: #333333;
    margin: 0 0 5px 0;
`;

const CardSubtitle = styled.p`
    font-size: 0.7rem;
    color: #777777;
    margin: 0;
`;

const CardDistance = styled.span`
    font-size: 0.7rem;
    color: #3c6e71;
`;
