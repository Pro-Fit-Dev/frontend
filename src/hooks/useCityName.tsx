import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

const cityMapping: Record<string, string> = {
    "서울특별시": "서울",
    "경기도": "경기",
    "부산광역시": "부산",
    "인천광역시": "인천",
    "대구광역시": "대구",
    "대전광역시": "대전",
    "광주광역시": "광주",
    "울산광역시": "울산",
    "세종특별자치시": "세종",
    "충청남도": "충남",
    "충청북도": "충북",
    "전라남도": "전남",
    "전라북도": "전북",
    "경상남도": "경남",
    "경상북도": "경북",
    "강원도": "강원",
    "제주특별자치도": "제주"
};

const useCityName = (latitude: number | null, longitude: number | null) => {
    const [cityName, setCityName] = useState<string>("");

    useEffect(() => {
        const fetchCityName = async () => {
            if (latitude === null || longitude === null) return;

            const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
            try {
                const response = await fetch(geocodingApiUrl);
                const data = await response.json();

                if (data.status === "OK" && data.results.length > 0) {
                    const addressComponents: AddressComponent[] = data.results[0].address_components;
                    const cityComponent = addressComponents.find((comp) =>
                        comp.types.includes("administrative_area_level_1")
                    );
                    if (cityComponent) {
                        const longName = cityComponent.long_name;
                        // 매핑을 통해 약어로 변환
                        const mappedName = cityMapping[longName] || longName;
                        setCityName(mappedName);
                    } else {
                        console.warn("City name not found in address components.");
                    }
                } else {
                    console.warn("Failed to fetch city name from coordinates.");
                }
            } catch (error) {
                console.error("Error fetching city name:", error);
            }
        };
        fetchCityName();
    }, [latitude, longitude]);

    return cityName;
};

export default useCityName;
