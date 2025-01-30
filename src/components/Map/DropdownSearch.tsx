import React, { useState, useEffect } from "react";
import useGetCurrentUserId from "../../hooks/useGetCurrentUserId";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Region {
    cityName: string;
    districtName: string[];
}

const regions: Region[] = [
    {
        cityName: "강원",
        districtName: [
            "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시",
            "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"
        ]
    },
    {
        cityName: "경기",
        districtName: [
            "가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시",
            "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시",
            "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시",
            "평택시", "포천시", "하남시", "화성시"
        ]
    },
    {
        cityName: "경남",
        districtName: [
            "거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시",
            "의령군", "진주시", "창녕군", "창원시", "통영시", "하동군", "함안군", "함양군", "합천군"
        ]
    },
    {
        cityName: "경북",
        districtName: [
            "경산시", "경주시", "고령군", "구미시", "김천시", "문경시", "봉화군", "상주시", "성주군",
            "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군",
            "청도군", "청송군", "칠곡군", "포항시"
        ]
    },
    { cityName: "광주", districtName: ["광산구", "남구", "동구", "북구", "서구"] },
    { cityName: "대구", districtName: ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"] },
    { cityName: "대전", districtName: ["대덕구", "동구", "서구", "유성구", "중구"] },
    {
        cityName: "부산",
        districtName: [
            "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구",
            "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"
        ]
    },
    {
        cityName: "서울",
        districtName: [
            "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구",
            "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구",
            "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
        ]
    },
    { cityName: "세종", districtName: ["세종시"] },
    { cityName: "울산", districtName: ["남구", "동구", "북구", "울주군", "중구"] },
    {
        cityName: "인천",
        districtName: [
            "강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구"
        ]
    },
    {
        cityName: "전남",
        districtName: [
            "강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군",
            "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군",
            "진도군", "함평군", "해남군", "화순군"
        ]
    },
    {
        cityName: "전북",
        districtName: [
            "고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시",
            "임실군", "장수군", "전주시", "정읍시", "진안군"
        ]
    },
    { cityName: "제주", districtName: ["서귀포시", "제주시"] },
    {
        cityName: "충남",
        districtName: [
            "계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군",
            "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군"
        ]
    },
    {
        cityName: "충북",
        districtName: [
            "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "진천군", "청주시",
            "충주시"
        ]
    }
];

const DropdownSearch: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
    const userId = useGetCurrentUserId();

    useEffect(() => {
        // 시/도를 선택하면 해당 시/군/구를 업데이트
        const city = regions.find((region) => region.cityName === selectedCity);
        setAvailableDistricts(city ? city.districtName : []);
        setSelectedDistrict(""); // 시/군/구 초기화
    }, [selectedCity]);

    const handleSearch = () => {
        if (!userId) {
            console.error("로그인한 사용자 ID를 찾을 수 없습니다.");
            return;
        }

        const url = `${import.meta.env.VITE_API_URL}/api/sports-voucher/search?userId=${userId}&cityName=${selectedCity}&districtName=${selectedDistrict}`;
        console.log("API 요청 URL:", url);
    };

    return (
        <Container>
            <Dropdown>
                <Select value={selectedCity} style={{ 'marginLeft': '10px' }} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">시/도 선택</option>
                    {regions.map((region) => (
                        <option key={region.cityName} value={region.cityName}>
                            {region.cityName}
                        </option>
                    ))}
                </Select>
                <Select value={selectedDistrict} style={{ 'marginRight': '10px' }} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedCity}>
                    <option value="">시/군/구 선택</option>
                    {availableDistricts.map((districtName) => (
                        <option key={districtName} value={districtName}>
                            {districtName}
                        </option>
                    ))}
                </Select>
            </Dropdown>
            <SearchButton onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
            </SearchButton>
        </Container>
    );
};

export default DropdownSearch;

const Container = styled.div`
position: fixed;
top: 8%;
width: 100%;
height: 8%;
display: flex;
justify-content: space-between;
align-items: center;
background-color: #fff;
border-bottom: 2px solid #ccc;
z-index: 1000;
box-sizing: border-box; 
`;

const Dropdown = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 1;
`;

const Select = styled.select`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.8rem;
    outline: none;
    background-color: #fff;

    &:disabled {
        background-color: #f9f9f9;
        cursor: not-allowed;
    }
`;

const SearchButton = styled.button`
    flex-shrink: 0;
    padding: 10px 15px;
    background-color: #3c6e71;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    &:hover {
        background-color: #2a5a58;
    }
    margin: 0 10px 0 0;
`;
