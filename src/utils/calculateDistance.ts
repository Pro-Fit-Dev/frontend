export const calculateDistance = (coord1: google.maps.LatLngLiteral, coord2: google.maps.LatLngLiteral): number => {
    const R = 6371e3; // 지구 반지름 (미터)
    const lat1 = (coord1.lat * Math.PI) / 180;
    const lat2 = (coord2.lat * Math.PI) / 180;
    const deltaLat = lat2 - lat1;
    const deltaLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;

    const a = Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 미터 단위 거리
};
