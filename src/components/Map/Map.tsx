import React, { useEffect, useRef, useState } from 'react';

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
    const [, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        const getUserLocation = () => {
            return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            resolve({ lat: latitude, lng: longitude });
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
                setUserLocation(location);

                if (mapRef.current) {
                    const map = new google.maps.Map(mapRef.current, {
                        center: location, // 사용자 위치로 중심 설정
                        zoom: 15, // 확대 수준 설정
                    });

                    // 마커 추가
                    new google.maps.Marker({
                        position: location,
                        map,
                        title: '현재 위치',
                    });
                }
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        };

        initializeMap();
    }, []);

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
