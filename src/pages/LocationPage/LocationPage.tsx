import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userLocationAtom } from "../../recoil/atoms/locationAtom";
import styled from "styled-components";
import useUserLocation from "../../hooks/useUserLocation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Map from '../../components/Map/Map';
import Loader from "../../components/Common/Loader";
import DropdownSearch from "../../components/Map/DropdownSearch";

const LocationPage: React.FC = () => {
    const [isResultsOpen, setIsResultsOpen] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    useUserLocation();
    const userLocation = useRecoilValue(userLocationAtom);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(e.targetTouches[0].clientY); // 터치 시작 위치
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0].clientY); // 터치 이동 위치
    };

    const handleTouchEnd = () => {
        const touchDiff = touchStart - touchEnd; // 터치 이동 거리

        if (touchDiff > 30) {
            // 위로 스와이프
            setIsResultsOpen(true);
        } else if (touchDiff < -30) {
            // 아래로 스와이프
            setIsResultsOpen(false);
        }
    };

    return (
        <Container>
            <Header />
            <DropdownSearch />
            <Main>
                {!userLocation ? (
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                ) : (
                    <>
                        <MapBackground>
                            <Map />
                        </MapBackground>
                        <ResultsContainer
                            isOpen={isResultsOpen}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <HandleBar />
                            <ResultsContent>
                                {[1, 2, 3].map((_, idx) => (
                                    <ResultItem key={idx}>
                                        <PlaceInfo>
                                            <PlaceName>XX 체육관</PlaceName>
                                            <PlaceAddress>경기도 시흥시 산기대학로 어쩌고</PlaceAddress>
                                        </PlaceInfo>
                                        <Distance>2km</Distance>
                                    </ResultItem>
                                ))}
                            </ResultsContent>
                        </ResultsContainer>
                    </>
                )}
            </Main>
            <Footer />
        </Container>
    );
};

export default LocationPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Main = styled.main`
    flex: 1;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const MapBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 5;
`;

const ResultsContainer = styled.div<{ isOpen: boolean }>`
    position: fixed;
    bottom: ${({ isOpen }) => (isOpen ? "0" : "0")};
    left: 0;
    width: 100%;
    height: ${({ isOpen }) => (isOpen ? "45%" : "15%")};
    background: #ffffff;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
    transition: bottom 0.3s ease-in-out, height 0.3s ease-in-out;
    z-index: 4;
    overflow-y: ${({ isOpen }) => (isOpen ? "scroll" : "hidden")};
    &::-webkit-scrollbar {
        display: none; /* 스크롤바 숨김 */
    }
`;

const HandleBar = styled.div`
    width: 40px;
    height: 5px;
    background: #ccc;
    border-radius: 10px;
    margin: 10px auto;
    cursor: pointer;
`;

const ResultsContent = styled.div`
    padding: 15px;
    overflow-y: auto;
`;

const ResultItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    overflow: auto;

    &:last-child {
        border-bottom: none;
    }
`;

const PlaceInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const PlaceName = styled.span`
    font-size: 1rem;
    font-weight: bold;
    color: #333;
`;

const PlaceAddress = styled.span`
    font-size: 0.9rem;
    color: #666;
`;

const Distance = styled.span`
    font-size: 0.9rem;
    color: #3c6e71;
    font-weight: bold;
`;
