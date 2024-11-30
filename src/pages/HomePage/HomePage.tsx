import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularSportsCenters from "../../components/MainPage/PopularSportsCenters";
import TodayQuote from "../../components/MainPage/TodayQuote";
import MonthlyRecommendations from "../../components/MainPage/MonthlyRecommendations";

const HomePage = () => {
    return (
        <Container>
            <Header />
            <Main>
                <PopularSportsCenters />
                <TodayQuote />
                <MonthlyRecommendations />
            </Main>
            <Footer />
        </Container>
    );
};

export default HomePage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Main = styled.main`
    flex: 1;
    width: auto;
    padding: 20% 40px;
    overflow-y: auto;
    background-color: #f9f9f9;
`;
