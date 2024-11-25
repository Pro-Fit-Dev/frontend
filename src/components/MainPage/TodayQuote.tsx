import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 명언 리스트
const quotes = [
    { quote: "나는 내가 할 수 있다고 믿었기 때문에 그렇게 되었다.", author: "무하마드 알리 (복싱 선수)" },
    { quote: "성공은 우연이 아니다. 노력, 인내, 배움, 공부, 희생, 그리고 무엇보다 당신이 하는 일에 대한 사랑이다.", author: "펠레 (축구 선수)" },
    { quote: "한계는 종종 실제가 아닌 당신의 마음 속에만 존재한다.", author: "페드로 마르티네즈 (야구 선수)" },
    { quote: "당신이 포기할 때, 그때가 경기가 끝나는 때다.", author: "빌리 진 킹 (테니스 선수)" },
    { quote: "승리하는 것이 전부가 아니라, 승리하려는 의지가 전부다.", author: "빈스 롬바르디 (미식축구 코치)" },
    { quote: "실패가 두려운 자는 성공할 자격이 없다.", author: "찰스 바클리 (전 농구 선수)" },
    { quote: "끝날 때까지 끝난 게 아니다.", author: "요기 베라 (미국 야구 선수)" },
    { quote: "승자는 절대 그만두지 않고 포기하는 자들은 결코 승리하지 못한다.", author: "빈스 롬바르디 (미식축구 선수)" },
    { quote: "나를 의심했던 사람들에게 감사하다. 그들은 내가 빨리 달릴 수 있는 자극제가 되었다.", author: "우사인 볼트" },
    { quote: "포기하지 말아라. 지금 고통을 겪고 남은 삶은 챔피언으로 살아라.", author: "무하마드 알리" },
];

const TodayQuote = () => {
    const [randomQuote, setRandomQuote] = useState({ quote: "", author: "" });

    // 컴포넌트가 렌더링될 때 랜덤 명언 설정
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
    }, []);

    return (
        <Container>
            <Title>오늘의 명언</Title>
            <Divider />
            <QuoteText>{randomQuote.quote}</QuoteText>
            <Author>– {randomQuote.author}</Author>
        </Container>
    );
};

export default TodayQuote;

// 스타일 정의
const Container = styled.div`
    background-color: #8ec6c5;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    color: #ffffff;
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
    margin: 15px 0;
`;

const QuoteText = styled.p`
    font-size: 1.2rem;
    margin: 0;
    line-height: 1.6;
    color: #ffffff;
    font-style: italic;
`;

const Author = styled.p`
    font-size: 0.9rem;
    margin: 10px 0 0;
    text-align: right;
    color: #ffffff;
`;
