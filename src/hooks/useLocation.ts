import { useState, useEffect } from 'react';

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export const useLocation = () => {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        const handleSuccess = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        };

        const handleError = (error: GeolocationPositionError) => {
            setError(error.message);
        };

        // Start watching position
        const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
            enableHighAccuracy: true,
        });

        // Clean up watcher on unmount
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return { location, error };
};
