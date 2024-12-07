import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { locationAtom, Coordinates } from '../recoil/atoms/locationAtom';

export const useLocation = () => {
    const [error, setError] = useState<string | null>(null);
    const setLocationInAtom = useSetRecoilState(locationAtom);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        const handleSuccess = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            const location: Coordinates = { latitude, longitude };

            // Recoil Atom에 위치 저장
            setLocationInAtom(location);
        };

        const handleError = (error: GeolocationPositionError) => {
            setError(error.message);
        };

        // 위치 추적 시작
        const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
            enableHighAccuracy: true,
        });

        // 컴포넌트 언마운트 시 위치 추적 중지
        return () => navigator.geolocation.clearWatch(watchId);
    }, [setLocationInAtom]);

    return { error };
};
