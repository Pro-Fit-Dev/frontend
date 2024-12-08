import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userLocationAtom } from "../recoil/atoms/locationAtom";

const useUserLocation = () => {
    const setUserLocation = useSetRecoilState(userLocationAtom);

    useEffect(() => {
        const fetchUserLocation = async () => {
            if (!navigator.geolocation) {
                console.error("Geolocation is not supported by this browser.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude }); // Recoil 상태에 저장
                    console.log("User location fetched:", { latitude, longitude });
                },
                (error) => {
                    console.error("Error fetching user location:", error.message);
                }
            );
        };

        fetchUserLocation();
    }, [setUserLocation]);
};

export default useUserLocation;
