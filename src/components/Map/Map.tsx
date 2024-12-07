import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { locationAtom } from '../../recoil/atoms/locationAtom';
import useFilterByDistance from '../../hooks/useFilterByDistance';
import Loader from '../Common/Loader';

interface Location {
    latitude: number;
    longitude: number;
}

const loadGoogleMapsScript = (apiKey: string) => {
    return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);

        if (!existingScript) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        } else {
            resolve(true);
        }
    });
};

const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const setUserLocation = useSetRecoilState(locationAtom);
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
    const { filterByDistance } = useFilterByDistance();

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        const getUserLocation = () => {
            return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            resolve({ latitude, longitude });
                        },
                        (error) => {
                            console.error('Error getting user location:', error);
                            reject(error);
                        }
                    );
                } else {
                    reject(new Error('Geolocation is not supported by this browser.'));
                }
            });
        };

        const fetchLocations = async () => {
            try {
                const response = await fetch('http://your-server.com/api/locations'); // 서버에서 장소 데이터 요청
                const data = await response.json();
                console.log('Fetched locations:', data);
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        const initializeMap = async () => {
            try {
                await loadGoogleMapsScript(apiKey);

                const location = await getUserLocation();
                setUserLocation(location); // 위치를 Recoil 상태에 저장

                if (mapRef.current) {
                    const map = new google.maps.Map(mapRef.current, {
                        center: { lat: location.latitude, lng: location.longitude }, // 사용자 위치로 중심 설정
                        zoom: 15, // 확대 수준 설정
                    });

                    // 주변 장소 필터링
                    const nearbyLocations = filterByDistance(locations, location, 5000); // 반경 5km
                    console.log('Filtered locations:', nearbyLocations);

                    // 마커 추가
                    nearbyLocations.forEach((loc) => {
                        new google.maps.Marker({
                            position: { lat: loc.latitude, lng: loc.longitude },
                            map,
                            title: loc.name, // 장소 이름
                        });
                    });
                }
            } catch (error) {
                console.error('Error initializing map:', error);
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        const loadData = async () => {
            setIsLoading(true);
            await fetchLocations();
            await initializeMap();
        };

        loadData();
    }, [setUserLocation, filterByDistance, locations]);

    return (
        <>
            {isLoading && <Loader />}
            <div
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
        </>
    );
};

export default Map;
