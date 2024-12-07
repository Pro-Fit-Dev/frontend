const useFilterByDistance = () => {
    const filterByDistance = (locations, userLocation, maxDistance) => {
        const { latitude: userLat, longitude: userLng } = userLocation;

        return locations.filter((location) => {
            const { latitude, longitude } = location;

            const toRad = (value) => (value * Math.PI) / 180;
            const R = 6371e3; // 지구 반지름 (미터)
            const φ1 = toRad(userLat);
            const φ2 = toRad(latitude);
            const Δφ = toRad(latitude - userLat);
            const Δλ = toRad(longitude - userLng);

            const a =
                Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c; // 거리 계산 (미터)
            return distance <= maxDistance; // 반경 내 필터링
        });
    };

    return { filterByDistance };
};

export default useFilterByDistance;
