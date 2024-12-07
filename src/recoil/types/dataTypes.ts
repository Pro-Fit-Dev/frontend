export interface SportsFacility {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    distance?: number; // 사용자 위치와의 거리
}