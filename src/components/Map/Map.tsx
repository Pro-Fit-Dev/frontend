import React, { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { locationAtom } from '../../recoil/atoms/locationAtom';

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
    const setUserLocation = useSetRecoilState(locationAtom); // Recoil 상태 업데이트

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

                    // 마커 추가
                    new google.maps.Marker({
                        position: { lat: location.latitude, lng: location.longitude },
                        map,
                        title: '현재 위치',
                    });
                }
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        };

        initializeMap();
    }, [setUserLocation]);

    return (
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
    );
};

export default Map;
