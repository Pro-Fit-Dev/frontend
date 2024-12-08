// import { useRecoilValue } from "recoil";
// import { locationAtom } from "../recoil/atoms/locationAtom";

// interface Location {
//     latitude: number;
//     longitude: number;
// }

// const useFilterByDistance = () => {
//     const userLocation = useRecoilValue(locationAtom);

//     const filterByDistance = (locations: Location[], maxDistance: number) => {
//         if (!userLocation) {
//             console.error("??? ??? ???? ?????.");
//             return [];
//         }

//         const { latitude: userLat, longitude: userLng } = userLocation;

//         return locations.filter((location) => {
//             const { latitude, longitude } = location;

//             const toRad = (value: number) => (value * Math.PI) / 180;
//             const R = 6371e3; // ?? ??? (??)
//             const ö1 = toRad(userLat);
//             const ö2 = toRad(latitude);
//             const Äö = toRad(latitude - userLat);
//             const Äë = toRad(longitude - userLng);

//             const a =
//                 Math.sin(Äö / 2) * Math.sin(Äö / 2) +
//                 Math.cos(ö1) * Math.cos(ö2) * Math.sin(Äë / 2) * Math.sin(Äë / 2);
//             const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//             const distance = R * c; // ?? ?? (??)
//             return distance <= maxDistance; // ?? ?? ??? ??? ??
//         });
//     };

//     return { filterByDistance };
// };

// export default useFilterByDistance;
